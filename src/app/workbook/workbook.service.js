(function() {
  'use strict';

  angular
    .module('pf.workbook')
    .factory('workbookService', workbookService);

  workbookService.$inject = ['$rootScope', 'workbookFactory', 'sheetService', 'coreCF'];
  function workbookService($rootScope, workbookFactory, sheetService, config) {
    var _spk = config.spreadKey;
    var _workbook = null;
    var service = {
      'initialize': initialize,
      'getWorkBook': getWorkBook,
      'toggle': toggleSheetByIndex
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
     * 切换一个表的, 并通知表服务更新维护表
     * @param  {Number}  index 预选中下标
     * @param  {Boolean} isUpdate 强制通知更新表
     * @return {Sheet} 当前选中的表
     */
    function toggleSheetByIndex(index, isUpdate) {
      var nowIndex = _workbook.index;
      if (nowIndex !== index || isUpdate === true) {
        var sheet = _workbook.selected(index);
        sheetService.update(sheet);
        return sheet;
      } else {
        return _workbook.sheets[nowIndex];
      }
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