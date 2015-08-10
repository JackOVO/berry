(function() {
  'use strict';
  // 工作簿数据展现

  angular
    .module('pf.workbook')
    .controller('WorkBookCtrl', workbookCtrl);

  workbookCtrl.$inject = [
    '$scope',
    'workbookService',
    'conditionService',
    'recommendService',
    'indicatorService',
    'coreCF'];

  function workbookCtrl($scope, workbookService, conditionService, recommendService, indicatorService, config) {
    var _spk = config.spreadKey;
    var that = this;
    that.isSync = true;
    that.workbook = null;

    that.sync = sync;
    that.toggle = toggle;
    that.remove = remove;
    that.openAddSheetDialog = openAddSheetDialog;

    $scope.loading = false; // 加载中标示


    // 变更监听
    $scope.$on(_spk.workbookChange, function(e, workbook) {
console.warn('C工作簿更新!', workbook);
      that.workbook = workbook;
    });

    // 数据同步状态监听
    $scope.$on(_spk.syncStatusChange, function(e, isSync) {
      that.isSync = isSync;
    });

    // 控制加载状态显示
    $scope.$on(_spk.loading, function(e, loading) {
      $scope.loading = loading;
    });

    // 切换表接口
    function toggle(index) {
      workbookService.toggle(index);
    }

    // 移除表接口
    function remove(e, index) {
      var r = window.confirm('你确认关闭该表吗?');
      if (r === false) { return; }
      workbookService.remove(index);
      e.stopPropagation();
    }

    // 同步工作簿
    function sync() {
      if (that.isSync === true) { return; }

      // 可以封装起来
      var gundam = conditionService.getGundam();
      var indicRecommendSelected = recommendService.getSelected();
      gundam.addSlectedCode('indicatorCode', indicRecommendSelected);
      // 可以封装起来

      recommendService.clearRecord(); // 清除指标推荐选中记录

      $scope.loading = true;
      workbookService.syncWorkBook(gundam).then(function() {
        $scope.loading = false;
      });
    }

    // 添加表窗口
    function openAddSheetDialog() {
      indicatorService.openModel('addSheet');
    }
  }

})();