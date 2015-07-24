(function() {
  'use strict';

  angular
    .module('pf.workbook')
    .factory('workbookService', workbookService);

  workbookService.$inject = ['$rootScope', 'workbookFactory', 'coreCF'];
  function workbookService($rootScope, workbookFactory, config) {
    var _spk = config.spreadKey;
    var _workbook = null;
    var service = {
      'initialize': initialize,
      'getWorkBook': getWorkBook
    };
    return service;

    function initialize(gundam) {
      return getWorkBook(gundam).then(function(workbook) {
        return workbookChange(workbook);
      });
    }

    /**
     * 获取工作簿根据钢弹
     * @param  {Gundam|Object} gundam 选中维度对象钢弹
     * @return {Promise}
     */
    function getWorkBook(gundam) {
      return workbookFactory.rqWorkBook(gundam).then(function(workbook) {
        return workbook;
      });
    }

    /**
     * 工作簿变更方法
     * @param  {WorkBook} workbook 变更了的工作簿
     * @return {WorkBook} 当期工作簿
     */
    function workbookChange(workbook) {
      _workbook = workbook;
      $rootScope.$broadcast(_spk.workbookChange, _workbook);
      return _workbook;
    }
  }

})();