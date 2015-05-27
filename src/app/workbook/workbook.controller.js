(function() {
  'use strict';

  angular
    .module('platform.workbook')
    .controller('WorkBookCtrl', WorkBookController);

  WorkBookController.$inject = ['$scope', 'workBookService', 'workBookCF'];
  function WorkBookController ($scope, workBookService, config) {
    var that = this;
    that.workBook = null;

    var spreadKey = config.spreadKey;

    var initCondition = config.condition;

    workBookService.getWorkBook(initCondition);

    // 工作簿改变监听
    $scope.$on(spreadKey.wbc, function(e, workBook) {
      that.workBook = workBook;
    });
  }

})();