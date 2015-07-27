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
    that.workbook = null;

    that.toggle = toggle;

    // 变更监听
    $scope.$on(_spk.workbookChange, function(e, workbook) {
console.warn('C工作簿更新!', workbook);
      that.workbook = workbook;
    });

    // 切换表接口
    function toggle(index) {
      workbookService.toggle(index);
    }
  }

})();