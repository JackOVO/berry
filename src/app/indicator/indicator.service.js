(function() {
  'use strict';
  // 指标服务, 这这那那

  angular
    .module('pf.indicator')
    .factory('indicatorService', indicatorService);

  indicatorService.$inject = [
    '$rootScope',
    'ngDialog',
    'workbookService',
    'conditionService',
    'coreCF'];

  function indicatorService($rootScope, ngDialog, workbookService, conditionService, config) {
    var _spk = config.spreadKey;
    var _syncType = 'syncWorkBook'; // 同步的类型
    var service = {
      'sync': sync,
      'openModel': openModel
    };
    return service;

    /**
     * 同步
     * @param {Object} selected 选中记录
     */
    function sync(selected) {
      var gundam = conditionService.getGundam();
      gundam.setSnlyDime('indicatorCode', selected);
      workbookService[_syncType](gundam);
    }

    /**
     * 打开添加指标的窗口
     * @param {String} oper 操作
     */
    function openModel(oper) {
      ngDialog.open({
        template: 'app/template/model/addIndicator.html',
        controller: 'AddIndicatorCtrl',
        controllerAs: 'aivm'
      });
      _syncType = oper ? 'addSheet' : 'syncWorkBook';
    }
  }

})();