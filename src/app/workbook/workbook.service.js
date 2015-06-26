(function() {
  'use strict';

  angular
    .module('platform.workbook')
    .factory('workBookService', workBookService);

  workBookService.$inject = [
    '$q',
    '$rootScope',
    'userService',
    'dataService',
    'conditionService',
    'sheetService',
    'workBookBean',
    'coreCF'
  ];
  function workBookService($q, $rootScope, userService, dataService, conditionService, sheetService, workBookBean, config) {

    var _workBook = null;
    var spk = config.spreadKey;
    var service = {
      'sync': syncWorkBookSource,
      'initialize': initialize,
      'selected': selectSheetByIndex
    };
    return service;

    // 启动逻辑
    function initialize () {
      // 得到初始化对象
      var gundam = conditionService.initialize();
      return getWorkBookSource(gundam);
    }

    /**
     * 初始工作簿源数据
     * @param  {gundam} gundam 传输条件对象
     * @return {Promise}
     */
    function getWorkBookSource(gundam) {
      var params = conditionService.serialization(gundam);
      return dataService.get('workBook', params)
        .then(function(source) {
          if (source.length) {
            _workBook = workBookBean.parse(source);
            workBookChange(_workBook);
            return _workBook;
          }
          return $q.reject('不识别的sheet源数据!' + source);
        });
    }

    /**
     * 同步工作簿源数据
     * @param  {Gundam} gundam [description]
     * @return {Promise}
     */
    function syncWorkBookSource(gundam) {
      var params = conditionService.serialization(gundam);
      return dataService.get('sync', params)
        .then(function(source) {
          if (source.length) {
            var syWorkBook = workBookBean.parse(source);
            //_workBook.sheets = [{}];
            var selIndex = _workBook.concatSheet(syWorkBook); // 合并表
            workBookChange(_workBook);
// console.info(selIndex);
            selectSheetByIndex(0);
            $rootScope.$apply();
            return _workBook;
          }
          return $q.reject('不识别的sheet源数据!!' + source);
        });
    }

    // 选中一个表并广播通知
    function selectSheetByIndex(sheetIndex) {
      var sheet = _workBook.selected(sheetIndex);
      if (sheet) {
        sheetService.update(sheet);
        // userService.setStatus('sheetIndex', sheetIndex); 保存状态?
      } else {
        console.error('无法选择有效的表.');
      }
    }

    // 实体变化处理方法
    function workBookChange(newData) {
      $rootScope.$broadcast(spk.workBookChange, newData);
    }
  }

})();
