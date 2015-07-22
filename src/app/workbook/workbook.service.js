(function() {
  'use strict';

  angular
    .module('pf.workbook')
    .factory('workbookService', workbookService);

  workbookService.$inject = ['workbookFactory'];
  function workbookService(workbookFactory) {
    var _workbook = null;
    var service = {
      'getWorkBook': getWorkBook
    };
    return service;

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
  }

})();