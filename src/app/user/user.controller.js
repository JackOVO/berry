(function() {
  'use strict';

  angular
    .module('platform.user')
    .controller('UserController', UserController);

  UserController.$inject = ['$scope', 'coreCF'];
  function UserController($scope, config) {
    var that = this;
    that.user = null;
    var spk = config.spreadKey;
console.info('userController');

    $scope.$on(spk.userChange, function(e, user) {
      that.user = user;
      console.info(user);
    });
  }
})();