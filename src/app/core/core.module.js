(function() {
  'use strict';

  angular
    .module('platform.core', [])
    .constant('coreCF', {
      baseUrl: 'http://localhost:5323/platform/',
      loginUrl: 'http://localhost:3000/login.html',
      urlMap: {
        'userInfo': 'userInfo.do',
        'workBook': 'jump.do'
      }
    })
    .config(function($httpProvider) {
      //$httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
      //$httpProvider.defaults.useXDomain = true;
      //$httpProvider.defaults.withCredentials = true;
      //delete $httpProvider.defaults.headers.common['X-Requested-With'];
      //$httpProvider.defaults.headers.put({'Access-Control-Allow-Origin': '*'});
      //$httpProvider.defaults.headers.Access-Control-Allow-Origin
    });

})();