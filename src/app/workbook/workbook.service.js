(function() {
  'use strict';

  angular
    .module('platform.workbook')
    .factory('workBookService', workBookService);

  workBookService.$inject = ['$q', '$rootScope', 'workBookBean', 'dataService', 'workBookCF'];
  function workBookService ($q, $rootScope, workBookBean, dataService, config) {
    var service = {
      'initialize': initialize,
      'getWorkBook': getWorkBookSource
    };
    var priv = {
      'workBook': null
    };
    var spreadKey = config.spreadKey;
    return service;

    // 启动逻辑
    function initialize () {
      
    }

    /**
     * 初始工作簿源数据
     * @param  {Condition} condition 条件对象
     * @return {Promise}
     */
    function getWorkBookSource (condition) {
      var params = {};
      params = condition; // 应该由条件进行转换操作.
      return dataService.get('workBook', params)
        .then(function(source) {
          if (source.length) {
            var workBook = workBookBean.parse(source);
            workBookChange(workBook);
            return workBook;
          }
          return $q.reject('不识别的sheet源数据!' + source);
        });
    }

    // 实体变化处理方法
    function workBookChange (newData) {
      $rootScope.$broadcast(spreadKey.wbc, newData);
    }

  }

})();