(function() {
  'use strict';

  angular
    .module('platform.condition')
    .controller('ConditionCtrl', ConditionCtrl);

  ConditionCtrl.$inject = ['$scope', 'conditionService', 'recommendService', 'coreCF'];
  function ConditionCtrl($scope, conditionService, recommendService, config) {
    var spk = config.spreadKey;
    var that = this, after = '';
    that.condition = null;
    that.accSortableOptions = {
      axis: 'y',
      handle: '.hander',
      tolerance: 'pointer',
      containment: 'parent',
    };

    that.toggleDirective = toggleDirective;
    // 维度重复性判断, 指令切换时不重复dom的话, 无法计算高度?
    that.byIndex = function(code) {
      console.info('----------------------------~!!!');
      return code + after;
    };
    // 记录选中的code, 防止切换时丢失
    that.selected = function(code) {
      return function(){ conditionService.selected(code); };
    };

    // 监听当前条件变更
    $scope.$on(spk.conditionChange, function(e, condition) {
      that.condition = condition;
console.info('接收到条件:', that.condition);
      after = new Date().getTime();
    });

    // 监听条件相关变更通知
    $scope.$on(spk.recommendCheckedChange, conditionChange);
    $scope.$watch('ccvm.condition.sequence', conditionChange, true);
    $scope.$watch('ccvm.condition.direction', conditionChange, true);
    $scope.$watch('ccvm.condition.dimensions', conditionChange, true);
    function conditionChange() {
      var condition = that.condition;
      if (!condition) { return; }
      // 当需要判断的选中不在条件对象中时, 需要在外部传入进去, 判断是否同步
      var attach = conditionService.fff(recommendService);
      var isSync = condition.isSync(attach);
      // 数据与条件同步状态通知, 向上
      $scope.$emit(spk.syncSubmitChange, isSync);
    }

    // 切换维度的方向
    function toggleDirective(e, code) {
      var direction = that.condition.direction[code];
      that.condition.direction[code] = direction === 'col' ? 'row' : 'col';
      e.stopPropagation();
    }
  }

})();
