(function() {
  'use strict';

  angular
    .module('platform.error')
    .factory('errorService', errorService);

  function errorService() {
    var service = {
      'file': filterData
    };
    return service;

    /**
     * 后台错误对象统一过滤处理
     * @param  {Object} data 后台源数据
     * @return {Object} false || 源数据
     */
    function filterData(data) {
console.info('错误过滤:', data);
      return data;
    }
  }

})();