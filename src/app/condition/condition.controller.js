(function() {
  'use strict';

  angular
    .module('platform.condition')
    .controller('ConditionCtrl', ConditionController);

  ConditionController.$inject = ['$scope', 'coreCF'];
  function ConditionController($scope, config) {
    var that = this;

    var spk = config.spreadKey;

    $scope.$on(spk.conditionChange, function(e, condition) {
      console.info(condition);
    });
  }
})();