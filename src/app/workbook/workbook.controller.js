(function() {
  'use strict';

  angular
    .module('platform.workbook')
    .controller('WorkBookCtrl', WorkBookController);

  WorkBookController.$inject = ['$scope', '$timeout', 'workBookService', 'coreCF'];
  function WorkBookController ($scope, $timeout, workBookService, config) {
    var that = this;
    that.workBook = null;
    that.selected = selectSheet;

    var spk = config.spreadKey;

    var initCondition = config.condition;

    console.log('\"!\"');
    /*启动逻辑开始*/
    // workBookService.getWorkBook(initCondition);

    // 工作簿改变监听
    $scope.$on(spk.workBookChange, function(e, workBook) {
      that.workBook = workBook;
      $timeout(function(){
        workBookService.selected(1);
      }, 500);
    });

    // 轻轻地我选中了你
    function selectSheet(index) {
      workBookService.selected(index);
    }
  }

})();