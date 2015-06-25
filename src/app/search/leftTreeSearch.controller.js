(function() {
  'use strict';

  angular
    .module('platform.search')
    .controller('LeftTreeSearchCtrl', LeftTreeSearchCtrl);

  // 右侧搜索控制区, 根据上下文获取请求搜索的类型
  LeftTreeSearchCtrl.$inject = ['$scope', '$rootScope', 'searchService', 'coreCF'];
  function LeftTreeSearchCtrl($scope, $rootScope, searchService, config) {
    var tree =  $scope.dim.tree; // 通过上下文获取
    var dimeCode = $scope.dim.code; // 通过上下文获取, 耦合, 可以获取已选中的节点
    var action = $scope.dim.feature.action; // 通过上下文获取
    var spk = config.spreadKey;

    var that = this;
    that.data = [];
    that.show = false;
    that.query = query;
    that.selected = function(item) {
      item.isSelected = !item.isSelected; // 搜索作用域
      tree.checkNode(item.code); // 实际数据选中节点
      $scope.$emit(spk.syncSearchSelectNodeEmit, item.code);
    };

    // 查询操作
    function query(value) {
      if (!value) {
        that.data = [];
        that.show = false;
        return null;
      }

      searchService.require(action, value)
        .then(function(serAry) {
          if (serAry.length) {
            that.show = true;
            var selCodes = tree.getAllSelCode();
            angular.forEach(serAry, function(node, index) {
              if(selCodes.indexOf(node.code) !== -1) {
                node.isSelected = true; // !!!!!!!!!!同步选中
              }
            });
          } else { that.show = false; }
          that.data = serAry;
        });

        // 获取当前维度选中的节点, 映射到当前数据上
        // 点击同步到更新ztree指令
    }
  }
 
})();