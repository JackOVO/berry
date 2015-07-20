(function() {
  'use strict';
  // 错误服务, 负责处理业务错误

  angular
    .module('pf.core')
    .factory('errorService', errorService);

  errorService.$inject = ['$q'];
  function errorService($q) {
    var service = {
      'swallow': swallow,
      'interception': interception,
      'NotLoggedIn': 100,
      'NoPermission': 101
    };
    return service;
    // errorService.swallow(errorService.NotLoggedIn)

    /**
     * 简易数据拦截, 负责拦截服务器错误信息
     * @param  {Object} source 数据源
     * @return {[type]}        [description]
     */
    function interception(source) {
      if (source && source.errorType) {
console.error(source);
        return $q.reject('服务器错误消息处理!!');
      } else {
        return source;
      }
    }

    function swallow(status) {
      switch(status) {
        case 100: // 未登录
console.warn('未登录!');
          break;
        case 101: // 无权限
console.warn('无权限!')
        default:
          console.error('errorService', '不识别的错误状态' + status);
        break;
      }
    }
  }

})();