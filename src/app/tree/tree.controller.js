(function() {
  'use strict';

  angular
    .module('platform.tree')
    .controller('LeftTreeCtrl', LeftTreeCtrl);

  // 右侧树选中的衔接控制器, 要保证上下文位置, 才能得到维度code, 耦合高
  LeftTreeCtrl.$inect = ['$scope', 'treeService'];
  function LeftTreeCtrl($scope, treeService) {
    var _dimeCode = null;
    var that = this;

    // 当前属性是根据控制器上下文获取的, 耦合较高, 为了区分不同维度的树
    if ($scope.dim && $scope.dim.code) {
      _dimeCode = $scope.dim.code;
    } else {
      console.error('树控制器上下文维度代码不存在!');
    }

    that.onCheck = function(node) {
      // 同步选中数据
      treeService.checked(_dimeCode, node);
      $scope.$apply(); // 条件控制器上层监听听不到
    };
  }

})();