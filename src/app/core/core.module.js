(function() {
  'use strict';

  angular
    .module('platform.core', [])
    .constant('coreCF', {
      baseUrl: 'http://dps.dfinder.cn/',
      loginUrl: 'http://login.dfinder.cn/login.html',
      urlMap: {
        'userInfo': 'userInfo.do',
        'workBook': 'jump.do'
      }
    })
    .config(function($httpProvider) {
      $httpProvider.defaults.withCredentials = true;
      //$httpProvider.defaults.headers.put({'Access-Control-Allow-Origin': '*'});
      //$httpProvider.defaults.headers.Access-Control-Allow-Origin
    });

})();
  