(function() {
  'use strict';
  // 表服务, 维护选中表操作.

  angular
    .module('pf.sheet')
    .factory('sheetService', sheetService);

  sheetService.$inject = [
    '$rootScope',
    'sheetFactory',
    'conditionService',
    'userService',
    'coreCF'];

  function sheetService($rootScope, sheetFactory, conditionService, userService, config) {
    var _spk = config.spreadKey;
    var _sheet = null; // 维护的表
    var service = {
      'update': sheetChange,
      'setRecord': setRecord,
      'getRecord': function(key){ return getRecord(_sheet.id)[key]; },
      'closeSheet': closeSheet
    };
    return service;

    /**
     * 表变更方法, 通过此方法改变内部维护表
     * @param  {Sheet} sheet 传入的表
     * @return {Sheet} 内部维护的表
     */
    function sheetChange(sheet) {
      _sheet = sheet;
      $rootScope.$broadcast(_spk.sheetChange, _sheet);
      // 联动更新条件容器
      conditionService.update(_sheet.condition);
      return _sheet;
    }

    /**
     * 对表类关闭表的接口
     * @param  {String} id 预删除表的id
     * @return {Promise}
     */
    function closeSheet(id) {
      return sheetFactory.rqClose(id);
    }

    /**
     * 以表为单位记录数据.
     * @param {String} key 哪
     * @param {Object} value 吒
     */
    function setRecord(key, value) {
      var sRecord = getRecord(_sheet.id);
      sRecord[key] = value;
      userService.setRecord(_sheet.id, sRecord);
      return getRecord(_sheet.id)[key];
    }

    /**
     * 返回表记录根据id, 实际存在用户上
     * @param  {String} sheetId 表id
     * @return {Object} 表记录|空对象
     */
    function getRecord(sheetId) {
      var sRecord = userService.getRecord(sheetId);
      return sRecord || {};
    }
  }

})();