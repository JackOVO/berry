(function() {
  'use strict';

  angular
    .module('pf.charts')
    .controller('chartCtrl', chartCtrl);


  chartCtrl.$inject = ['$scope', 'handsontableService', 'coreCF'];
  function chartCtrl($scope, handsontableService, config) {
    var _spk = config.spreadKey;
    var that = this;
    that.charts = null;
console.info('!');

    // 图表数据变更监听
    $scope.$on(_spk.chartsChange, function(e, charts) {
      that.charts = charts;
    });

    handsontableService.addAfterSelectionEnd(function(r, c, r1, c1) {
console.info(r, c, r1, c1);
    });
  }

})();