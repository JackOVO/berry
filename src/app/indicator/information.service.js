(function() {
  'use strict';

  angular
    .module('platform.indicator')
    .factory('informationService', informationService);

  informationService.$inject = ['$rootScope', 'dataService', 'coreCF'];
  function informationService($rootScope, dataService, config) {
    var _spk = config.spreadKey;
    var _infomation = null; // 当前维护
    var _isOpen = false;
    var service = {
      'toggle': toggle,
      'updateInfomation': updateInfomation
    };
    return service;

    // 切换显示状态
    function toggle(bl) {
      _isOpen = bl || !_isOpen;
      $rootScope.$broadcast(_spk.rightInfoIsOpenChange, _isOpen);
    }

    /**
     * 更新当前维护的infomation, 并广播通知
     * @param  {String} id 指标id
     */
    function updateInfomation(id) {
      toggle(true);
      getInformation(id).then(function(information) {
        _infomation = information;
        $rootScope.$broadcast(_spk.infomationChange, _infomation);
      });
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