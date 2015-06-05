(function() {
  'use strict';

  angular
    .module('platform.condition')
    .factory('conditionService', conditionService);

  conditionService.$inject = ['$rootScope', 'conditionBean', 'dataService', 'coreCF'];
  function conditionService($rootScope, conditionBean, dataService, config) {
    var service = {
      'initialize': initialize,
      'formatGundam': formatGundam,
      'selectedDimension': selectedDimension,
      'updateNowCondition': updateNowCondition
    };
    var priv = {
      'gundom': null, // 全局初始条件, 共同表
      'condition': null
    };
    var spk = config.spreadKey;
    var cookieDomain = config.domain;
    var gundamKey = config.globalGundomKey;
    return service;

    function initialize () {
      diversionByCookie(); // cookie转移条件
      priv.gundom = dataService.getItem(gundamKey);
      if (window.debug) { priv.gundom = config.gundom; }
      return priv.gundom;
    }

    /**
     * 选中一个维度
     * @param  {String} code 维度代码
     */
    function selectedDimension (code) {
      console.info(priv.condition);
      priv.condition.selectedDimension(code);
    }

    /**
     * 格式化传输条件对象, 供提交用
     * @param  {[type]} gundam [description]
     * @return {[type]}        [description]
     */
    function formatGundam(gundam) {
      var result = {};
      result.dims = angular.toJson(gundam.dims);
      if (gundam.productID) { result.productID = gundam.productID; }
      return result;
    }

    /**
     * 把cookie中的条件导入到LocalStorage中,
     * 并set同步标示, 保证条件供给的唯一
     * @return {[type]} [description]
     */
    function diversionByCookie() {
      var key = config.userCookieKey;
      var ckobj = dataService.getCookieObj(key);

      // 判断cookie是否与localStorage同步
      if (ckobj && !ckobj.isSycn) {
        ckobj.isSycn = true;
        dataService.putCookieObj(key, ckobj, {domain: cookieDomain});
        var gundam = conditionBean.parseGundam(ckobj.dims);
        dataService.setItem(gundamKey, gundam);
      }
    }

    /**
     * 更新内部当前条件对象
     * @param  {Condition} condition 外传
     * @return {Condition} 当前条件对象
     */
    function updateNowCondition(condition) {
      priv.condition = condition;
      $rootScope.$broadcast(spk.conditionChange, condition);
      console.info(priv.condition);
      return priv.condition;
    }
  }
})();