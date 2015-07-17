(function() {
  'use strcit';

  angular
    .module('platform.workbook')
    .factory('workBookService', workBookService);

  workBookService.$inject = [
    '$rootScope', 'dataService',
    'conditionService', 'workBookFactory', 
    'sheetService', 'coreCF'];
  function workBookService($rootScope, dataService, conditionService, workBookFactory, sheetService, config) {
    var _pid = null;
    var _workBook = null; // 工作簿维护
    var _spk = config.spreadKey, _notice = {};
    _notice.workBookChange = function() {
      $rootScope.$broadcast(_spk.workBookChange, _workBook);
    };
    _notice.syncWorkBook = function() {
      $rootScope.$broadcast(_spk.syncWorkBook);
    };

    var service = {
      'addSheet':addSheet,
      'syncSheet': syncSheet,
      'initialize': initialize,
      'selectSheet': selectSheet
    };
    return service;

    function initialize(gundam) {
      _pid = gundam.productID; // 产品线id?
      return requireWorkBook(gundam)
        .then(function(workBook) {
console.warn('R工作簿', workBook);
          _workBook = workBook;
          _notice.workBookChange(); // 通知工作簿変更
          return _workBook;
        });
    }

    /**
     * 同步一个表, 不同sheetId会新增表
     * @param {Stirng} dimCode 额外添加选中的code
     * @param {Array} codes 选中的code
     * @return {[type]} [description]
     */
    function syncSheet(dimCode, codes) {
      var sheetId = sheetService.getSheetId();
      var conditoin = conditionService.getNowNowNow();
      var gundam = conditoin.press();

      // 添加额外指标
      if (dimCode) { gundam.addSlectedCode(dimCode, codes); }

      gundam.sheetId = sheetId; // 还要带上它, 新增表判断靠SheetId
      gundam.productID = _pid; // 还要带上它, 产品线

      _notice.syncWorkBook(); // 状态通知
      return requireWorkBook(gundam).then(function(workBook) {
          var selectIndex = _workBook.merger(workBook);
          _notice.workBookChange(); // 通知工作簿変更
          return selectIndex;
        });
    }

    /**
     * 添加单独的表, 指标维度
     * @param {String} dimCode 指标Code
     * @param {Array} codes 选中code
     */
    function addSheet(dimCode, codes) {
      var aloneDim = conditionService.serializationAloneDim(dimCode, codes);
console.info(aloneDim);
      aloneDim.productID = _pid; // 还要带上它, 产品线

      _notice.syncWorkBook(); // 状态通知
      return requireWorkBook(aloneDim).then(function(workBook) {
          var selectIndex = _workBook.merger(workBook);
          _notice.workBookChange(); // 通知工作簿変更
          return selectIndex;
        });
    }

    /**
     * 请求工作簿信息, 得到解析后的工作簿
     * @param  {Gundam} gundam 条件传输对象
     * @return {Promise}
     */
    function requireWorkBook(gundam) {
      var params = conditionService.serializationGundam(gundam);
      return dataService.get('workBook', params)
        .then(function(workBookSource) {
          var workBook = workBookFactory.parse(workBookSource);
          return workBook;
        });
    }

    /**
     * 选中一个表, 并変更工作表
     * @param {Number} index 表下标
     */
    function selectSheet(index) {
      var selectedSheet = _workBook.selectSheet(index);
      sheetService.updateSheet(selectedSheet);
    }
  }

})();