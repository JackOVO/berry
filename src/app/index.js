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
          templateUrl: 'app/core/layout.html',
          controller: 'SheetCtrl as sc'
        });

      $urlRouterProvider.otherwise('/');
    }

    // 启动逻辑
    startLogic.$inject = ['userService', 'workbookService', 'coreCF'];
    function startLogic(userService, workbookService, config) {
      // 用户初始化
      userService.initialize().then(function(user) {
        var dime = user.record.dime; // 维度记录
console.info(user);
if (config.debug === true) { dime = config.dime; }
        // 工作簿初始化
        workbookService.initialize(dime).then(function(workbook) {
          workbookService.toggle(0, true);
        });
        // angular.forEach(dime, function(dim, index) {
        //   console.info(dim);
        // });

      });
    }

})();