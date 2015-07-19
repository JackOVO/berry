(function() {
  'use strict';

  angular
    .module('pf', [
      'ui.router',
      'ngResource',
      'ngSanitize',
      'pf.user'
    ])
    .config(appConfig)
    .run(startLogic);

    // 路由启动配置
    appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function appConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('home', {
          url: '/'
        });

      $urlRouterProvider.otherwise('/');
    }

    // 启动逻辑
    startLogic.$inject = ['userService'];
    function startLogic(userService) {
      userService.initialize().then(function() {

      });
    }

})();