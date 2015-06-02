(function() {
  'use strict';

  angular
    .module('platform.condition')
    .controller('ConditionCtrl', ConditionController);

  ConditionController.$inject = ['$scope', 'coreCF'];
  function ConditionController($scope, config) {
    var that = this;
    that.condition = null;

    var spk = config.spreadKey;

    $scope.$on(spk.nowConditionChange, function(e, condition) {
      console.info(condition);
      that.condition = condition;
    });
  }
})();