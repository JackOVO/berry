(function() {
  'use strict';
  // 错误服务, 负责处理业务错误

  angular
    .module('pf.core')
    .factory('errorService', errorService);

  errorService.$inject = ['$q'];
  function errorService($q) {
    var service = {
      'interception': interception
    };
    return service;

    /**
     * 简易数据拦截, 负责拦截服务器错误信息
     * @param  {Object} source 数据源
     * @return {[type]}        [description]
     */
    function interception(source) {
      if (source && source.errorType) {
        console.error(source);
        return $q.reject('服务器信息处理!!');
      } else {
        return source;
      }
    }
  }

})();