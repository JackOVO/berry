(function() {
  'use strict';
  // 条件容器控制器

  angular
    .module('pf.condition')
    .controller('conditionCtrl', conditionCtrl);

  conditionCtrl.$inject = ['$scope', '$timeout', 'sheetService', 'coreCF'];
  function conditionCtrl($scope, $timeout, sheetService, config) {
    var _spk = config.spreadKey;
    var _after = null; // 区分不同维度key的后缀
    var that = this;
    that.selectedDimCode = null; // 记录选中的维度代码
    that.condition = null;

    // 数组去重index记录
    that.byIndex = function(code) { return code + _after; };
    // 记录选中的维度code
    that.upSelectedFn = function(code) {
      return function(){ sheetService.setRecord('dimCode', code); };
    };

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
  }

})();