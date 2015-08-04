(function() {
  'use strict';
  // 条件容器控制器

  angular
    .module('pf.condition')
    .controller('conditionCtrl', conditionCtrl);

  conditionCtrl.$inject = ['$scope', '$timeout', 'conditionService', 'sheetService', 'coreCF'];
  function conditionCtrl($scope, $timeout, conditionService, sheetService, config) {
    var _spk = config.spreadKey;
    var _after = null; // 区分不同维度key的后缀
    var that = this;
    that.condition = null;
    that.selectedDimCode = null; // 记录选中的维度代码
    that.accSortableOptions = {
      axis: 'y',
      handle: '.hander',
      tolerance: 'pointer',
      containment: 'parent'
    };

    // 数组去重index记录
    that.byIndex = function(code) { return code + _after; };
    // 记录选中的维度code
    that.upSelectedFn = function(code) {
      return function(){ sheetService.setRecord('dimCode', code); };
    };
    // 切换维度方向
    that.toggleDirection = function(e, code) {
      conditionService.toggleDirection(code);
      e.stopPropagation();
    }

    // 监听条件容器变更通知
    $scope.$on(_spk.conditionChange, function(e, condition) {
      // 条件排序数组不会刷新, 强制刷新整个对象
      that.condition = null;
      $timeout(function() {
        _after = new Date().getTime(); // 创建一个新后缀
        that.condition = condition;
        // 打开的维度代码
        that.selectedDimCode = sheetService.getRecord('dimCode') || config.openDimCode;
      }, 1);
    });

    // 监听是否请求推荐信息还是使用缓存数据
    $scope.$on(_spk.askRecommendRefresh, function(e, type) {
      // 拿到现在的指标长度
      var size = sheetService.getRecord('iss');
      var nowSize = that.condition.dimensions.indicatorCode.tree.childs.length;
      sheetService.setRecord('iss', nowSize);

      if (size === nowSize) {
        $scope.$broadcast(_spk.getRecommendChange, type);
      } else {
        $scope.$broadcast(_spk.refreshRecommend, type);
      }
    });
  }

})();