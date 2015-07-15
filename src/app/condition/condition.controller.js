(function() {
  'use strict';

  angular
    .module('platform.condition')
    .controller('ConditionCtrl', ConditionCtrl);

  ConditionCtrl.$inject = ['$scope', '$timeout', 'ngDialog', 'conditionService', 'sheetService', 'coreCF'];
  function ConditionCtrl($scope, $timeout, ngDialog, conditionService, sheetService, config) {
    var _spk = config.spreadKey;
    var _after = null; // 为了区分不同维度key的后缀
    var that = this;
    that.condition = null;
    that.selectedDimCode = null; // 选中的维度代码, 记录打开的手风琴项目
    that.accSortableOptions = {
      axis: 'y',
      handle: '.hander',
      tolerance: 'pointer',
      containment: 'parent'
    };

    that.byIndex = function(code) {
      return code + _after;
    };
    that.rSelectedFn = function(code) {
      return function(){ sheetService.addRecord('dimCode', code); };
    };
    that.toggleDirection = function(e, dCode) {
      conditionService.toggleDirection(dCode);
      e.stopPropagation();
    };
    that.openAddIndicator = openAddIndicatorDialog;

    // 监听条件改变
    $scope.$watch('ccvm.condition', function(n, o) {
      if (!that.condition) { return; }
      var gundam = that.condition.press();
      var isSync = gundam.equal(that.condition.current);
      $scope.$emit(_spk.syncStatusChange, isSync);
    }, true);

    // 附加选中变更后, 添加选中后, 重新判断同步
    $scope.$on(_spk.dimSelectedChange, function(e, selected) {
      var gundam = that.condition.press();
      // 从推荐中添加选中的指标
      gundam.addSlectedCode('indicatorCode', selected);
      var isSync = gundam.equal(that.condition.current);
      $scope.$emit(_spk.syncStatusChange, isSync);
    });

    // 监听当前条件变更
    $scope.$on(_spk.conditionChange, function(e, condition) {
      // 由于条件排序数组不会更新, 所以只能强制刷新
      that.condition = null;
      $timeout(function() {
        _after = new Date().getTime(); // 创建一个新后缀
        that.condition = condition;
        // 得到打开的维度
        that.selectedDimCode = sheetService.getRecord('dimCode') || config.openDimCode;
console.warn('C条件', that.condition);
      }, 1);
    });

    // 监听是否刷新推荐询问
    $scope.$on(_spk.askRecommendRefresh, function(e, type) {
      if (type === 'indicator') { // 只有指标, 类型扩展用
        var indicatorSelectedSize = that.condition.dimensions.indicatorCode.tree.childs.length;
        var size = sheetService.getRecord('iss');
        sheetService.addRecord('iss', indicatorSelectedSize);
        if (size !== indicatorSelectedSize) {
          $scope.$broadcast(_spk.refreshRecommend, type);
        } else {
          $scope.$broadcast(_spk.getRecommend, type);
        }
      }
    });

    // 由于是引入的页面, 可能会存在服务广播时, 控制器未加载完成导致无法得到数据
    // if(!that.condition) { conditionService.again(); }
    
    // 打开添加指标对话框
    function openAddIndicatorDialog() {
      ngDialog.open({
        template: 'app/template/addIndicator.html',
        controller: 'AddIndicatorCtrl',
        controllerAs: 'aivm'
      });
    }
  }

})();