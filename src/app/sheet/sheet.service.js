(function() {
  'use strict';

  angular
    .module('platform.sheet')
    .factory('sheetService', sheetService);

  sheetService.$inject = ['$rootScope', 'conditionService', 'coreCF'];
  function sheetService($rootScope, conditionService, config) {
    var _sheet = null;
    var service = {
      'update': updateSheet,
      'getSheetId': getSheetId
    };
    var spk = config.spreadKey;
    return service;

    function initialize() {}

    /**
     * 更新选中的工作表
     * @param  {Sheet} sheet 工作表
     * @return {Sheet}
     */
    function updateSheet(sheet) {
      _sheet = sheet;
      var condition = _sheet.condition;
      var table = _sheet.table;
console.info('当前表为:', _sheet);
      $rootScope.$broadcast(spk.sheetChange, _sheet);

      conditionService.update(condition);
      //$rootScope.$broadcast(spk.nowTableChange, nowTable);
      return _sheet;
    }

    // 返回当期表Id
    function getSheetId () {
      return _sheet.id;
    }
  }

})();
