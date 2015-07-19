(function() {
  'use strict';

  angular
    .module('pf', [
      'ui.router',
      'ngResource',
      'ngSanitize'
    ])
    .config(appConfig);

    // 路由启动配置
    appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function appConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('home', {
          url: '/'
        });

      $urlRouterProvider.otherwise('/');
    }

})();