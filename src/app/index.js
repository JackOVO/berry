(function() {
  'use strict';

  angular
    .module('pf', [
      'ui.router',
      'ngResource',
      'ngSanitize',
      'pf.user',
      'pf.workbook'
    ])
    .config(appConfig)
    .run(startLogic);

    // 路由启动配置
    appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function appConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'app/core/layout.html'
        });

      $urlRouterProvider.otherwise('/');
    }

    // 启动逻辑
    startLogic.$inject = ['userService', 'workbookService'];
    function startLogic(userService, workbookService) {
      userService.initialize().then(function(user) {
        var dime = user.record.dime;
console.info(user);
        workbookService.initialize(dime).then(function(workbook) {

        });
        // angular.forEach(dime, function(dim, index) {
        //   console.info(dim);
        // });

      });
    }

})();