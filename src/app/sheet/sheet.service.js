(function() {
  'use strict';

  angular
    .module('platform.sheet')
    .factory('sheetService', sheetService);

  sheetService.$inject = ['$rootScope', 'conditionService', 'coreCF'];
  function sheetService ($rootScope, conditionService, config) {
    var service = {
      'initialize': initialize,
      'updateSheet': updateSelectedSheet
    };
    var priv = {
      'selectedSheet': null
    };
    var spk = config.spreadKey;
    return service;

    function initialize() {
      
    }

    /**
     * 更新选中的工作表
     * @param  {Sheet} sheet 工作表
     * @return {Sheet}
     */
    function updateSelectedSheet(sheet) {
      priv.selectedSheet = sheet;
      var nowCondition = priv.selectedSheet.condition;
      var nowTable = priv.selectedSheet.table;

      conditionService.updateNowCondition(nowCondition);
      //$rootScope.$broadcast(spk.nowTableChange, nowTable);
      //$rootScope.$broadcast(spk.nowConditionChange, nowCondition);
      return priv.selectedSheet;
    }
  }
})();