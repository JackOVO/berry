(function() {
  'use strict';

  angular
    .module('platform.workbook')
    .controller('WorkBookCtrl', WorkBookCtrl);

WorkBookCtrl.$inject = ['$scope', 'workBookService', 'conditionService', 'recommendService', 'sheetService', 'coreCF'];
  function WorkBookCtrl($scope, workBookService, conditionService, recommendService, sheetService, config) {
    var that = this;
    that.sync = sync;
    that.isSync = true;
    that.workBook = null;
    that.selected = selectSheet;
    var spk = config.spreadKey;

    // 工作簿改变监听
    $scope.$on(spk.workBookChange, function(e, workBook) {
console.info('控制器监听', workBook);
      that.workBook = workBook;
    });

    // 同步提交监听
    $scope.$on(spk.syncSubmitChange, function(e, isSync) {
      that.isSync = isSync;
    });

    // 轻轻地我选中了你
    function selectSheet(index) {
      workBookService.selected(index);
    }

    // 同步
    function sync() {
      var attach = conditionService.fff(recommendService);
      var gundam = conditionService.getGundam(attach);
      var sheetId = sheetService.getSheetId();
console.info(gundam);
      gundam.setSheetId(sheetId);
      workBookService.sync(gundam); // 同步请求
      conditionService.setGundam(gundam); // set回去
    }
  }

})();
