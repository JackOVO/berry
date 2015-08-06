(function() {
  'use strict';
  // 工作簿数据展现

  angular
    .module('pf.workbook')
    .controller('WorkBookCtrl', workbookCtrl);

  workbookCtrl.$inject = ['$scope', 'workbookService', 'coreCF'];
  function workbookCtrl($scope, workbookService, config) {
    var _spk = config.spreadKey;
    var that = this;
    that.isSync = true;
    that.workbook = null;

    that.toggle = toggle;
    that.remove = remove;

    // 变更监听
    $scope.$on(_spk.workbookChange, function(e, workbook) {
console.warn('C工作簿更新!', workbook);
      that.workbook = workbook;
    });

    // 数据同步状态监听
    $scope.$on(_spk.syncStatusChange, function(e, isSync) {
      that.isSync = isSync;
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
  }

})();