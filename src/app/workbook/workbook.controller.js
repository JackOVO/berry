(function() {
  'use strict';

  angular
    .module('platform.workbook')
    .controller('WorkBookCtrl', WorkBookCtrl);

  WorkBookCtrl.$inject = ['$scope', 'workBookService', 'coreCF'];
  function WorkBookCtrl($scope, workBookService, config) {
    var that = this;
    that.workBook = null;
    that.selected = selectSheet;
    var spk = config.spreadKey;

    // 工作簿改变监听
    $scope.$on(spk.workBookChange, function(e, workBook) {
console.info('控制器监听', workBook);
      that.workBook = workBook;
    });

    // 轻轻地我选中了你
    function selectSheet(index) {
      workBookService.selected(index);
      //console.info(userService);
      //userService.selected(index);
    }
  }

})();

// (function() {
//   

//   angular
//     .module('platform.workbook')
//     .controller('WorkBookCtrl', WorkBookController);

//   WorkBookController.$inject = ['$scope', '$timeout', 'workBookService', 'coreCF'];
//   function WorkBookController ($scope, $timeout, workBookService, config) {
//     var that = this;
//     
//     

//     

//     var initCondition = config.condition;

//     /*启动逻辑开始*/
//     // workBookService.getWorkBook(initCondition);



//      //$scope.$on('$viewContentLoaded', function(event) {
//       //console.info('撒');
//       // $timeout(function() {
//       //   $scope.formData.value = document.getElementById("loginForm").id;
//       // },0);
//     //});


//   }

// })();