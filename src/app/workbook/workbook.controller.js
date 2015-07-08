(function() {
  'use strict';

  angular
    .module('platform.workbook')
    .controller('WorkBookCtrl', WorkBookCtrl);

  WorkBookCtrl.$inject = ['$scope', 'workBookService', 'recommendService', 'coreCF'];
  function WorkBookCtrl($scope, workBookService, recommendService, config) {
    var _spk = config.spreadKey;
    var that = this;
    that.sync = sync; // 同步选中表数据
    that.isSync = true; // 同步状态
    that.workBook = null; // 工作簿
    that.selectSheet = workBookService.selectSheet;


    $scope.$on(_spk.syncStatusChange, function(e, isSync) {
      that.isSync = isSync;
    });

    $scope.$on(_spk.workBookChange, function(e, workBook) {
      that.workBook = workBook;
console.warn('C工作簿', that.workBook);
    });

    // 同步表
    function sync() {
      //that.isSync = false;
      var recommendSelectedCodes = recommendService.getSelectRecord();
      workBookService.syncSheet('indicatorCode', recommendSelectedCodes)
        .then(function(selectIndex) {
          // 清空推荐选中, 防止重复添加已同步的指标
          recommendService.clearSelectRecord();
          // 选择返回的下标
          workBookService.selectSheet(selectIndex);
      });
    }

    // $scope.array = {'ary': ['1', '2', '3']};
    // $scope.$watch('array.ary', function(n, c){
    //   console.info(n,'?',c);
    // });
    // $scope.index = function(n) {
    //   console.info('----');
    //   return n;
    // };

    // setTimeout(function() {
    //   $scope.array = {'ary': ['1', '2', '3']};
    //   $scope.$apply();
    //   console.info('----');
    // }, 1000);
  }

})();