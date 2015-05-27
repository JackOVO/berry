(function() {
  'use strict';

  angular
    .module('platform', [
      'platform.core',
      'platform.directive',
      'platform.workbook',
      'ui.router',
      'ngResource',
      'ngSanitize'])
    .config(appConfig);

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
