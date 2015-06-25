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
    that.byIndex = function(code) { return code + after; };
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


    $scope.$on(spk.recommendCheckedChange, conditionChange);
    $scope.$watch('ccvm.condition.sequence', conditionChange, true);
    $scope.$watch('ccvm.condition.direction', conditionChange, true);
    $scope.$watch('ccvm.condition.dimensions', conditionChange, true);
    //$scope.$watch('ccvm.condition', conditionChange, true);
    function conditionChange() {
      var condition = that.condition;
      if (!condition) { return; }
      var cus = angular.toJson(condition.current); // 当前数据对应的序列条件对象
      var tcus = angular.toJson(getNowFlow(condition)); // 未提交的序列条件对象

      // 同步状态
      $scope.$emit(spk.syncSubmitChange, cus === tcus);
      
      // console.info(cus);
      // console.log(cus === tcus);

//console.info('11111111111111111111111111111111');
    }

    // 得出当前的条件
    function getNowFlow(condition) {
      var flow = condition.flow();
      angular.forEach(flow.dims, function(dim, index) {
        var type = dim.codeName;
        var reCheck = recommendService.getCheckedRecord(type);
        
        angular.forEach(reCheck, function(bol, code) {
          if (bol === true) { dim.codes.push(code); }
        });
      });
      return flow;
    }

    // 切换维度的方向
    function toggleDirective(e, code) {
      var direction = that.condition.direction[code];
      that.condition.direction[code] = direction === 'col' ? 'row' : 'col';
      e.stopPropagation();
    }
  }

})();
