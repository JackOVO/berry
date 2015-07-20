(function() {
  'use strict';

  angular
    .module('pf.user')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$scope'];
  function LoginCtrl($scope) {
    $scope.msg = '我市人口';
    var that = this;
  }

})();