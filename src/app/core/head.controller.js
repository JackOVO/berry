(function() {
  'use strict';
  // 头

  angular
    .module('pf.core')
    .controller('HeadCtrl', HeadCtrl);

  HeadCtrl.$inject = ['$scope', 'coreCF'];
  function HeadCtrl($scope, config) {
    var _spk = config.spreadKey;
    var that = this;
    that.title = 'ﾚ(ﾟ∀ﾟ;)ﾍ=З=З=З';

    $scope.$on(_spk.sheetChange, function(e, sheet) {
      that.title = sheet.name;
    });
  }

})();