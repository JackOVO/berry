(function() {
  'use strict';

  angular
    .module('platform.workbook')
    .factory('workBookService', workBookService);

  workBookService.$inject = [
    '$q',
    '$rootScope',
    'workBookBean',
    'conditionService',
    'dataService',
    'coreCF'
  ];

  function workBookService ($q, $rootScope, workBookBean, conditionService, dataService, config) {
    var service = {
      'initialize': initialize,
      'getWorkBook': getWorkBookSource,
      'selected': selectSheetByIndex
    };
    var priv = {
      'workBook': null
    };
    var spk = config.spreadKey;
    return service;

    // 启动逻辑
    function initialize () {
      // 得到初始化对象
      var gundom = conditionService.initialize();
      console.info(gundom);
    }

    /**
     * 初始工作簿源数据
     * @param  {Condition} condition 条件对象
     * @return {Promise}
     */
    function getWorkBookSource(condition) {
      var params = {};
      params = condition; // 应该由条件进行转换操作.
      return dataService.get('workBook', params)
        .then(function(source) {
          if (source.length) {
            priv.workBook = workBookBean.parse(source);
            workBookChange(priv.workBook);
            return priv.workBook;
          }
          return $q.reject('不识别的sheet源数据!' + source);
        });
    }

    // 选中一个表并广播通知
    function selectSheetByIndex(sheetIndex) {
      var nowSheet = priv.workBook.selected(sheetIndex);
      if (nowSheet) {
        $rootScope.$broadcast(spk.selectedSheetChange, nowSheet);
      } else {
        console.error('无法选择有效的表.');
      }
    }

    // 实体变化处理方法
    function workBookChange (newData) {
      $rootScope.$broadcast(spk.workBookChange, newData);
    }

  }

})();