(function() {
  'use strict';

  angular
    .module('platform.condition')
    .controller('ConditionCtrl', ConditionController);

  ConditionController.$inject = ['$scope', 'conditionService', 'coreCF'];
  function ConditionController($scope, conditionService, config) {
    var that = this, after = '';
    that.condition = null;
    that.toggleDirective = toggleDirective;
    // 维度重复性判断, 指令切换时不重复dom的话, 无法计算高度?
    that.byIndex = function(code) { return code + after; };
    that.selected = function(code) {
      return function() {
        conditionService.selectedDimension(code);
      }
    };

    var spk = config.spreadKey;

    // 统一由服务管理
    $scope.$on(spk.conditionChange, function(e, condition) {
console.info(condition);
      that.condition = condition ;
      after = new Date().getTime();
    });

    // 切换维度的方向
    function toggleDirective(e, code) {
      var direction = that.condition.direction[code];
      that.condition.direction[code] = direction === 'col' ? 'row' : 'col';
      e.stopPropagation();
    }
  }
})();