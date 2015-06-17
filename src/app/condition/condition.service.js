(function() {
  'use strict';

  angular
    .module('platform.condition')
    .factory('conditionService', conditionService);

    conditionService.$inject = ['$rootScope', 'conditionBean', 'dataService', 'coreCF'];
    function conditionService($rootScope, conditionBean, dataService, config) {
      var _gundam = null;
      var _condition = null;

      var spk = config.spreadKey;
      var cookieDomain = config.domain;
      var gundamKey = config.globalGundomKey;

      var service = {
        'initialize': initialize,
        'update': updateCondition,
        'selected': selectedDimension,
        'serialization': serializationGundam,
        'getTree': getTreeByDimeCode
      };
      return service;

      function initialize () {
        diversionByCookie(); // cookie转移条件到localStorage
        _gundam = dataService.getItem(gundamKey);
        if (window.debug) { _gundam = config.gundom; }
        return _gundam;
      }

      /**
       * 更新内部当前条件对象
       * @param  {Condition} condition 外传
       * @return {Condition} 当前条件对象
       */
      function updateCondition(condition) {
        _condition = condition;
console.info('当前条件:', condition);
        $rootScope.$broadcast(spk.conditionChange, _condition);
        return _condition;
      }

      /**
       * 选中一个维度, 切换记录用
       * @param  {String} code 维度代码
       */
      function selectedDimension(code) {
        _condition.selectedDimension(code);
      }

      /**
       * 获取指定维度的树
       * @return {Tree}
       */
      function getTreeByDimeCode(code) {
        if (!_condition.dimensions[code]) {
          console.error('没有该维度信息', code);
        } else if (!_condition.dimensions[code].tree) {
          console.error('该维度没有树属性', code);
        } else {
          return _condition.dimensions[code].tree;
        }
      }

      /**
       * 序列化传输条件对象, 供提交用
       * @param  {Gundam} gundam 传递用的用户对象
       * @return {Object} 提交的条件参数
       */
      function serializationGundam(gundam) {
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
      function diversionByCookie () {
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
    }

})();
