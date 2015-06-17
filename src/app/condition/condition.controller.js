(function() {
  'use strict';

  angular
    .module('platform.condition')
    .controller('ConditionCtrl', ConditionCtrl);

  ConditionCtrl.$inject = ['$scope', 'conditionService', 'coreCF'];
  function ConditionCtrl($scope, conditionService, config) {
    var spk = config.spreadKey;
    var that = this, after = '';
    that.condition = null;

    that.toggleDirective = toggleDirective;
    // 维度重复性判断, 指令切换时不重复dom的话, 无法计算高度?
    that.byIndex = function(code) { return code + after; };
    // 记录选中的code, 防止切换时丢失
    that.selected = function(code) {
      return function(){ conditionService.selected(code); };
    };

    // 监听当前条件变更
    $scope.$on(spk.conditionChange, function(e, condition) {
      that.condition = condition ;
console.info('接收到条件:', that.condition);
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
