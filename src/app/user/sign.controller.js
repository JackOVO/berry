(function() {
  'use strict';

  angular
    .module('platform.user')
    .controller('SignCtrl', SignCtrl);

  SignCtrl.$inject = ['$scope', 'userService'];
  function SignCtrl($scope, userService) {
    var that = this;
    $scope.go = go;
    $scope.user = {}; // 用户填写的信息
    $scope.disable = true; // 可提交标示
    $scope.message = ''; // 提示信息

    $scope.$watch('user', function(user) {
      var count = 0;
      angular.forEach(user, function(value, key) {
        if (value) { count++; }
      });
      if (count > 0) { $scope.disable = false; }
        else { $scope.disable = true; }
    }, true);

    function go() {
      if ($scope.disable === true) { return; }
      userService.signup($scope.user).then(function(msg) {
        if (msg.success === false) {
          $scope.message = msg.message;
        } else {

        }
      });
    }
  }

})();