(function() {
  'use strict';
  // 手风琴内容控制器, 中转监听

  angular
    .module('platform.condition')
    .controller('AccContentCtrl', AccContentCtrl);

  AccContentCtrl.$inject = ['$scope', 'coreCF'];
  function AccContentCtrl($scope, config) {
    var _spk = config.spreadKey;
    var that = this;

    // 转播监听, 缩小至内容范围防止干扰到其他的控制器
    $scope.$on(_spk.accContentBridge, function(e, parameters) {
      var key = parameters[0];
      $scope.$broadcast(_spk[key], parameters[1]);
    });

  }

})();