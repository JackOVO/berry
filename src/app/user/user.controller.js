(function() {
  'use strict';

  angular
    .module('platform.user')
    .controller('UserCtrl', UserCtrl);

  UserCtrl.$inject = ['$scope', 'coreCF'];
  function UserCtrl($scope, config) {
    var that = this;
    that.user = null;
    var spk = config.spreadKey;

    $scope.$on(spk.userChange, function(e, user) {
      that.user = user;
    });

  }
})();