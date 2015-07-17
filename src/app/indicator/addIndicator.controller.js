(function() {
  'use strict';

  angular
    .module('platform.indicator')
    .controller('AddIndicatorCtrl', AddIndicatorCtrl)
    .filter('kwf', keyworkFilter);

  AddIndicatorCtrl.$inject = ['$scope', 'searchService', 'workBookService'];
  function AddIndicatorCtrl($scope, searchService, workBookService) {
    var _isAddSheet = ($scope.ngDialogData === 'addSheet');
    var that = this;
    that.selected = {}; // 选中记录
    that.disabled = true; // 可提交状态
    that.searchList = null;
    that.addIndicator = sycn;
    $scope.keyword = '';

    // 监听关键字查询指标
    $scope.$watch('keyword', function(keyword) {
      if (keyword) {
        searchService.search('indicator', keyword)
          .then(function(source) {
            that.searchList = source;
          });
      }
    });

    // 监听选中, 验证是否可以提交
    $scope.$watch('aivm.selected', function(selected) {
      var fCount = 0;
      angular.forEach(selected, function(bl, code) {
        if (bl === true) { fCount++; }
      });

      if (fCount >= 1) { that.disabled = false; }
        else { that.disabled = true; }
    }, true);

    // 添加选中的指标
    function sycn() {
      if (that.disabled === true) { return; }
      var fnName = _isAddSheet===true ? 'addSheet' : 'syncSheet';

      // 根据打开的标识判断是否在同纬度下也添加新表
      workBookService[fnName]('indicatorCode', that.selected)
        .then(function(selectIndex) {
console.info(selectIndex);
          workBookService.selectSheet(selectIndex); // 选择返回的下标
        });
      // 清空选中
      that.selected = {};
      $scope.closeThisDialog();
    }
  }

  keyworkFilter.$inject = ['$sce'];
  function keyworkFilter($sce) {
    return function (text, keyword) {
      var re = new RegExp(keyword, 'g');
      text = text.replace(re, function(kw) {
        return '<em>'+kw+'</em>';
      });
      return $sce.trustAsHtml(text);
    }
  }

})();