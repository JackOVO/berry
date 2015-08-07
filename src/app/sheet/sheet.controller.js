(function() {
  'use strict';

  angular
    .module('pf.sheet')
    .controller('SheetCtrl', SheetCtrl);

  SheetCtrl.$inject = ['$rootScope', '$scope', 'indicatorService', 'coreCF'];
  function SheetCtrl($rootScope, $scope, indicatorService, config) {
    var _spk = config.spreadKey;
    var that = this;
    that.sheet = null;

    that.openAddIndicator = function() { indicatorService.openModel(); };

    $scope.$on(_spk.sheetChange, function(e, sheet) {
console.warn('C工作表更新!', sheet);
      that.sheet = sheet;
    });
  }

})();