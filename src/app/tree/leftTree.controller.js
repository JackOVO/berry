(function() {
  'use strict';

  angular
    .module('platform.tree')
    .controller('LeftTreeCtrl', LeftTreeCtrl);

  // 右侧树选中的衔接控制器, 要保证上下文位置, 才能得到维度code, 耦合高
  LeftTreeCtrl.$inject = ['$scope'];
  function LeftTreeCtrl($scope) {
    var root = $scope.dim.tree;
    var that = this;

    that.onCheck = function(node) {
      var id = node.id, checked = node.checked;
      root.checkNode(id, checked);
      // 同步选中数据
      $scope.$apply(); // 条件控制器上层通知不到?
    };
  }

})();