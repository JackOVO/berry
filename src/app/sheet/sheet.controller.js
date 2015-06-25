(function() {
  'use strict';

  angular
    .module('platform.sheet')
    .controller('SheetCtrl', SheetCtrl);

  SheetCtrl.$inject = ['$scope', '$rootScope', 'sheetService', 'coreCF'];
  function SheetCtrl ($scope, $rootScope, sheetService, config) {
    var that = this;
    that.sheet = null;
    that.disabled = true;
    var spk = config.spreadKey;

    // 模板渲染完成
    $scope.$on('$viewContentLoaded', function() {
      $rootScope.$broadcast(spk.go); // 可以启动
    });

    $scope.$on(spk.sheetChange, function(e, sheet) {
console.info('接收到表:', sheet);
      that.sheet = sheet;
      //sheetService.updateSheet(nowSheet);
      // var table = nowSheet.table;
      // var condition = nowSheet.condition;

      // $scope.$broadcast(spk.tableChange, table);
      // $scope.$broadcast(spk.conditionChange, condition);
    });

    // 提交同步问题
    $scope.$on(spk.syncSubmitChange, function(e, isSSS) {
      that.disabled = isSSS;
    });
  }

})();