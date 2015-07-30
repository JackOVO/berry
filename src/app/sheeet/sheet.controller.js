(function() {
  'use strict';

  angular
    .module('pf.sheet')
    .controller('SheetCtrl', SheetCtrl);

  SheetCtrl.$inject = ['$rootScope', '$scope', 'coreCF'];
  function SheetCtrl($rootScope, $scope, config) {
    var _spk = config.spreadKey;
    var that = this;
    that.sheet = null;

    $scope.$on(_spk.sheetChange, function(e, sheet) {
console.warn('C工作表更新!', sheet);
      that.sheet = sheet;
    });
  }

})();