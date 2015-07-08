(function() {
  'use strict';

  angular
    .module('platform.sheet')
    .factory('sheetService', sheetService);

  sheetService.$inject = ['$rootScope', 'conditionService', 'dataService', 'coreCF'];
  function sheetService($rootScope, conditionService, dataService, config) {
    var _sheet = null;
    var _spk = config.spreadKey, _notice = {};
    _notice.sheetChange = function() {
      $rootScope.$broadcast(_spk.sheetChange, _sheet);
    };

    var service = {
      'updateSheet': updateSheet,
      'getSheetId': function() { return _sheet.id; },
      'addRecord': addRecordBySheet,
      'getRecord': getRecordBySheet,
      'delRecord': function(){ console.error('剔除没用的记录!'); }
    };
    return service;

    /**
     * 更新当前维护的表, 会广播变更
     * @param  {Sheet} Sheet 传入项
     */
    function updateSheet(Sheet) {
      _sheet = Sheet;
      _notice.sheetChange(); // 変更通知

      var condition = _sheet.condition;
      conditionService.updateCondition(condition);
    }

    /**
     * 以表为键添加一条记录, 存在session中
     * @param {String} key
     * @param {Object} value
     * @param {Object} 返回表所有记录
     */
    function addRecordBySheet(key, value) {
      var sheetId = _sheet.id;
      var sheetRecord = dataService.getSessionItem(sheetId);
      sheetRecord[key] = value;
      dataService.setSessionItem(sheetId, sheetRecord);
      return sheetRecord;
    }

    /**
     * 获取指定表记录, 存在session中
     * @param  {String} key 储存标志
     * @return {Object} 对应的值
     */
    function getRecordBySheet(key) {
      var sheetId = _sheet.id;
      var sheetRecord = dataService.getSessionItem(sheetId);
      return sheetRecord[key];
    }
  }

})();