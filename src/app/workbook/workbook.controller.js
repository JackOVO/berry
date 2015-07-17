(function() {
  'use strict';

  angular
    .module('platform.workbook')
    .controller('WorkBookCtrl', WorkBookCtrl);

  WorkBookCtrl.$inject = ['$scope', 'ngDialog', 'workBookService', 'recommendService', 'coreCF'];
  function WorkBookCtrl($scope, ngDialog, workBookService, recommendService, config) {
    var _spk = config.spreadKey;
    var that = this;
    that.sync = sync; // 同步选中表数据
    that.isSync = true; // 同步状态
    that.workBook = null; // 工作簿
    that.selectSheet = workBookService.selectSheet;
    that.openAddSheetDialog = openAddSheetDialog;
    $scope.workbookLD = false; // 加载状态


    $scope.$on(_spk.syncStatusChange, function(e, isSync) {
      that.isSync = isSync;
    });

    $scope.$on(_spk.syncWorkBook, function(e) {
      $scope.workbookLD = true;
    });

    $scope.$on(_spk.workBookChange, function(e, workBook) {
      that.workBook = workBook;
      $scope.workbookLD = false;
console.warn('C工作簿', that.workBook);
    });

    // 同步表
    function sync() { 
      if (that.isSync === true) { return; }
      var recommendSelectedCodes = recommendService.getSelectRecord();
      workBookService.syncSheet('indicatorCode', recommendSelectedCodes)
        .then(function(selectIndex) {
          // 清空推荐选中, 防止重复添加已同步的指标
          recommendService.clearSelectRecord();
          // 选择返回的下标
          workBookService.selectSheet(selectIndex);
      });
    }

    // 打开添加表对话框
    function openAddSheetDialog() {
      ngDialog.open({
        template: 'app/template/addIndicator.html',
        controller: 'AddIndicatorCtrl',
        controllerAs: 'aivm',
        data: 'addSheet' // 嘿嘿标示一下
      });
    }
  }

})();