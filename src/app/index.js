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
    .run(startLogic);

  startLogic.$inject = [
    '$rootScope',
    'userService',
    'workBookService',
    'coreCF'
  ];

  function startLogic ($rootScope, userService, workBookService, config) {
    var spk = config.spreadKey;

    $rootScope.$on(spk.go, function(e) {
      $.cookie.json = true;

      console.info('启动!');
      userService.initialize()
        .then(function(userInfo) {
          if (userInfo) {
            workBookService.initialize();
          }
        });
    });
  }

  appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function appConfig ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/core/layout.html',
        controller: 'SheetCtrl', // 绑定的试图完成事件, 会广播给大家
        controllerAs: 'scvm'
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
