(function() {
  'use strict';

  angular
    .module('platform.condition')
    .factory('conditionService', conditionService);

  conditionService.$inject = ['$rootScope', 'coreCF'];
  function conditionService($rootScope, config) {
    var _conditoin = null;
    var _spk = config.spreadKey, _notice = {};
    _notice.conditionChange = function() {
      $rootScope.$broadcast(_spk.conditionChange, _conditoin);
    };

    var service = {
      'initialize': initialize,
      'getNowNowNow': function(){ return _conditoin; },
      'serializationGundam': serializationGundam,
      'updateCondition': updateCondition,
      'toggleDirection': toggleDirection
    };
    return service;

    function initialize() {
      
    }

    /**
     * 序列化传输条件对象, 供提交用
     * @param  {Gundam} gundam 传递用的用户对象
     * @return {Object} 提交的条件参数
     */
    function serializationGundam(gundam) {
      console.info(gundam);
      var result = {};
      result.dims = angular.toJson(gundam.dims);

      if (gundam.sheetId) { result.sheetId = gundam.sheetId; }
      if (gundam.metaRow) { result.metaRows = gundam.metaRow.join('-'); }
      if (gundam.metaColumn) { result.metaColumns = gundam.metaColumn.join('-'); }
      if (gundam.productID) { result.productID = gundam.productID; }
      return result;
    }

    /**
     * 更新当前维护的条件对象
     * @param  {Condition} condition 传入条件
     */
    function updateCondition(condition) {
      _conditoin = condition;
      _notice.conditionChange();
    }

    /**
     * 切换条件方向
     * @param {String} dCode 维度Code
     * @return {String} 'col'|]'row'
     */
    function toggleDirection(dCode) {
      return _conditoin.toggle(dCode);
    }
  }

})();