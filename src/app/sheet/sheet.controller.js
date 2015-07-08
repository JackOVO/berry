(function() {
  'use strict';

  angular
    .module('platform.sheet')
    .controller('SheetCtrl', SheetCtrl);

  SheetCtrl.$inject = ['$scope', 'coreCF'];
  function SheetCtrl($scope, config) {
    var _spk = config.spreadKey;
    var that = this;
    that.sheet = null;

    $scope.$on(_spk.sheetChange, function(e, sheet) {
      that.sheet = sheet;
console.warn('C工作表', that.sheet);
    });

    // 加载到表控制器
    $scope.$emit(_spk.sheetCtrlLoadComplete, 'xdd');
  }

})();