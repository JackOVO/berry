(function() {
  'use strict';

  angular
    .module('platform.search')
    .controller('LeftTreeSearchCtrl', LeftTreeSearchCtrl);

  // 右侧树搜索控制器, 上下文依赖, 获取搜索类型
  LeftTreeSearchCtrl.$inject = ['$scope', 'searchService', 'coreCF'];
  function LeftTreeSearchCtrl($scope, searchService, config) {
    var _spk = config.spreadKey;
    var root = $scope.dim.tree; // 耦合根
    var type = $scope.dim.feature.action; // 耦合搜索类型

    var that = this;
    that.show = false;
    that.data = [];

    // 搜索吧
    that.query = function(keyword) {
      if (!keyword) { that.data = []; that.show = false; }
      else {
        searchService.search(type, keyword).then(function(list) {
            that.show = !!list.length;
            if (that.show === true) {
              // 当前树已经选中的节点id, 要同步到搜索的节点中
              var selected = root.getSelectedIds();
              angular.forEach(list, function(node) {
                if (selected.indexOf(node.code) !== -1) { node.isSelected = true; }
              });
            }
            that.data = list;
          });
      }
    };

    // 选择吧
    that.selected = function(node) {
      node.isSelected = !node.isSelected;
      // 实际树选中
      root.checkNode(node.code, node.isSelected);
      // 通知树节点选中
      $scope.$emit(_spk.accContentBridge, ['searchSelectNodeChange', node.code]);
    };
  }

})();