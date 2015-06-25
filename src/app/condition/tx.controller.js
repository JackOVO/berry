(function() {
  'use strict';

  angular
    .module('platform.search')
    .controller('txCtrl', txCtrl);

  txCtrl.$inject = ['$scope', 'coreCF'];
  function txCtrl($scope, config) {
    var that = this;
    var spk = config.spreadKey;

    // 同级通信中转, 搜索选中同步
    $scope.$on(spk.syncSearchSelectNodeEmit, function(e, value) {
      $scope.$broadcast(spk.syncSearchSelectNode, value);
    });
  }

})();