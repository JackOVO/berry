(function() {
  'use strict';

  angular
    .module('platform.condition')
    .controller('ConditionCtrl', ConditionController);

  ConditionController.$inject = ['$scope', 'conditionService', 'coreCF'];
  function ConditionController($scope, conditionService, config) {
    var that = this;
    that.condition = null;
    that.toggleDirective = toggleDirective;

    var spk = config.spreadKey;

    // 统一由服务管理
    $scope.$on(spk.nowConditionChange, function(e, condition) {
console.info(condition);
      that.condition = condition;
    });

    // 切换维度的方向
    function toggleDirective(e, code) {
      var direction = that.condition.direction[code];
      that.condition.direction[code] = direction === 'col' ? 'row' : 'col';
      e.stopPropagation();
    }
  }
})();