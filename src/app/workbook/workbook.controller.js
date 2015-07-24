(function() {
  'use strict';
  // 工作簿数据展现

  angular
    .module('pf.workbook')
    .controller('WorkBookCtrl', workbookCtrl);

  workbookCtrl.$inject = ['$scope', 'coreCF'];
  function workbookCtrl($scope, config) {
    var _spk = config.spreadKey;
    var that = this;
    that.workbook = null;
console.info('-1');
    // 变更监听
    $scope.$on(_spk.workbookChange, function(e, workbook) {
console.warn('C工作簿更新!', workbook);
      that.workbook = workbook;
    });
  }

})();