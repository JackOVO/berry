(function() {
  'use strict';

  angular
    .module('platform.indicator')
    .controller('sideIndicatorCtrl', sideIndicatorCtrl);

  // 侧板栏耦合指标控制器
  sideIndicatorCtrl.$inject = ['$scope'];
  function sideIndicatorCtrl($scope) {
    var tree = $scope.dim.tree;
    var that = this;

    // 删除一项指标
    that.remove = function(code) {
      for (var i = 0, ilen = tree.childs.length; i < ilen; i++) {
        var node = tree.childs[i];
        if (node.code === code) {
          return tree.childs.splice(i, 1);
        }
      }
    };
  }

})();