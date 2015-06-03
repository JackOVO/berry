(function() {
  'use strict';

  angular
    .module('platform.sheet')
    .factory('sheetService', sheetService);

  sheetService.$inject = ['$rootScope', 'coreCF'];
  function sheetService ($rootScope, config) {
    var service = {
      'updateSheet': updateSelectedSheet
    };
    var priv = {
      'selectedSheet': null
    };
    var spk = config.spreadKey;
    return service;

    /**
     * 更新选中的工作表
     * @param  {Sheet} sheet 工作表
     * @return {Sheet}
     */
    function updateSelectedSheet(sheet) {
      priv.selectedSheet = sheet;
      var nowCondition = priv.selectedSheet.condition;
      var nowTable = priv.selectedSheet.table;

      $rootScope.$broadcast(spk.nowTableChange, nowTable);
      $rootScope.$broadcast(spk.nowConditionChange, nowCondition);
      return priv.selectedSheet;
    }
  }
})();