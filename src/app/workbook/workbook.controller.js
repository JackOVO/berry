(function() {
  'use strict';

  angular
    .module('platform.workbook')
    .controller('WorkBookCtrl', WorkBookController);

  WorkBookController.$inject = ['$scope', 'workBookService', 'coreCF'];
  function WorkBookController ($scope, workBookService, config) {
    var that = this;
    that.workBook = null;
    that.selected = selectSheet;

    var spk = config.spreadKey;

    var initCondition = config.condition;

    workBookService.getWorkBook(initCondition);

    // 工作簿改变监听
    $scope.$on(spk.workBookChange, function(e, workBook) {
      that.workBook = workBook;
      workBookService.selected(1);
    });

    // 轻轻地我选中了你
    function selectSheet(index) {
      workBookService.selected(index);
    }

    console.log('我是彩0!');
  }

})();