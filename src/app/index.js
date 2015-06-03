(function() {
  'use strict';

  angular
    .module('platform', [
      'platform.core',
      'platform.user',
      'platform.directive',
      'platform.workbook',
      'ui.router',
      'ngResource',
      'ngSanitize'])
    .config(appConfig)
    .run(['userService', '$timeout', function(userService, $timeout) {
      // 用户初始化, 启动逻辑, 顺序问题
      $timeout(function() {
        userService.initialize();
        console.info(1);
      }, 1);
    }]);

  appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function appConfig ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/core/layout.html'
      });

    $urlRouterProvider.otherwise('/');
  }

})();


// angular.module('berry', ['ngAnimate', 'ngCookies', 'ngSanitize', 'ngResource', 'ui.router'])
//   .config(function ($stateProvider, $urlRouterProvider) {
//     $stateProvider
//       .state('home', {
//         url: '/',
//         templateUrl: 'app/main/main.html',
//         controller: 'MainCtrl'
//       });

//     $urlRouterProvider.otherwise('/');
//   })
// ;
