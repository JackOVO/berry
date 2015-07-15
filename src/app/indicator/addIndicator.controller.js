(function() {
  'use strict';

  angular
    .module('platform.indicator')
    .controller('AddIndicatorCtrl', AddIndicatorCtrl)
    .filter('kwf', keyworkFilter);

  AddIndicatorCtrl.$inject = ['$scope', 'searchService'];
  function AddIndicatorCtrl($scope, searchService) {
    var that = this;
    that.searchList = null;
    that.selected = {}; // 选中记录
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
console.info(selected);
    });
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