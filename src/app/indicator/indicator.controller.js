(function() {
  'use strict';

  angular
    .module('platform.indicator')
    .controller('IndicatorCtrl', IndicatorCtrl);

  // 耦合控制指标
  IndicatorCtrl.$inject = ['$scope'];
  function IndicatorCtrl($scope) {
    var tree = $scope.dim.tree;
    var that = this;
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