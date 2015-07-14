(function() {
  'use strict';

  angular
    .module('platform.indicator')
    .factory('informationService', informationService);

  informationService.$inject = ['$rootScope', 'dataService', 'coreCF'];
  function informationService($rootScope, dataService, config) {
    var _spk = config.spreadKey;
    var _isOpen = false;
    var _infomation = null; // 当前维护
    var _indicatorId = null; // 切换至的当前指标id
    var service = {
      'toggle': toggle,
      'getNowId': function(){ return _isOpen===true?_indicatorId:null; },
      'toggleInfomation': toggleInfomation
    };
    return service;

    // 切换显示状态
    function toggle(bl) {
      _isOpen = bl || !_isOpen;
      $rootScope.$broadcast(_spk.rightInfoIsOpenChange, _isOpen);
      return _isOpen;
    }

    /**
     * 切换infomation, 并广播通知
     * @param  {String} id 指标id
     */
    function toggleInfomation(id) {
      if (_indicatorId === id) {
        toggle();
      } else { toggle(true); }
      _indicatorId = id;

      // 打开时才重新请求加载
      if (_isOpen === true) {
        // 请求广播
        $rootScope.$broadcast(_spk.requireInfomation);
        getInformation(id).then(function(information) {
          _infomation = information;
          $rootScope.$broadcast(_spk.infomationChange, _infomation);
        });
      }
    }

    /**
     * 获取指标详细信息
     * @param  {String} id 标识符
     * @return {} 承诺
     */
    function getInformation(id) {
      var params = {'indicatorCode': id};

      return dataService.get('information', params)
        .then(function(informationSouce) {
          return informationSouce;
        });
    }

  }

})();