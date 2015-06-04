(function() {
  'use strict';

  angular
    .module('platform.sheet')
    .controller('SheetCtrl', SheetController);

  SheetController.$inject = ['$scope', '$rootScope', 'sheetService', 'coreCF'];
  function SheetController ($scope, $rootScope, sheetService, config) {
    var that = this;

    var spk = config.spreadKey;

    $scope.$on(spk.selectedSheetChange, function(e, nowSheet) {
      sheetService.updateSheet(nowSheet);
      // var table = nowSheet.table;
      // var condition = nowSheet.condition;

      // $scope.$broadcast(spk.tableChange, table);
      // $scope.$broadcast(spk.conditionChange, condition);
    });

    // 模板渲染完成
    $scope.$on('$viewContentLoaded', function() {
      $rootScope.$broadcast(spk.go); // 可以启动
    });
  }
})();