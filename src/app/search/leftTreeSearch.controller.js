(function() {
  'use strict';

  angular
    .module('platform.search')
    .controller('LeftTreeSearchCtrl', LeftTreeSearchCtrl);

  // 右侧搜索控制区, 根据上下文获取请求搜索的类型
  LeftTreeSearchCtrl.$inject = ['$scope', 'searchService'];
  function LeftTreeSearchCtrl($scope, searchService) {
    var action = $scope.dim.feature.action; // 通过上下文获取
    var dimeCode = $scope.dim.code; // 通过上下文获取, 耦合, 可以获取已选中的节点
    var that = this;
    that.data = [];
    that.show = false;
    that.query = query;

    // 查询操作
    function query(value) {
console.info(dimeCode);
      if (!value) {
        that.data = [];
        that.show = false;
        return null;
      }

      searchService.require(action, value)
        .then(function(serAry) {
          if (serAry.length) { that.show = true; }
            else { that.show = false; }
          that.data = serAry;
        });

        // 获取当前维度选中的节点, 映射到当前数据上
        // 点击同步到更新ztree指令
    }
  }
 
})();