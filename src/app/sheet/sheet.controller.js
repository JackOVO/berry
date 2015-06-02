(function() {
  'use strict';

  angular
    .module('platform.sheet')
    .controller('SheetCtrl', SheetController);

  SheetController.$inject = ['$scope', 'sheetService', 'coreCF'];
  function SheetController ($scope, sheetService, config) {
    var that = this;

    var spk = config.spreadKey;

    $scope.$on(spk.selectedSheetChange, function(e, nowSheet) {
      sheetService.updateSheet(nowSheet);
      // var table = nowSheet.table;
      // var condition = nowSheet.condition;

      // $scope.$broadcast(spk.tableChange, table);
      // $scope.$broadcast(spk.conditionChange, condition);
    });
  }
})();