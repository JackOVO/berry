(function() {
  'use strict';
// 纵观全局
  angular
    .module('platform', [
      'ui.router',
      'ngResource',
      'ngSanitize',
      'platform.core',
      'platform.user',
      'platform.workbook',
      'platform.directive'
    ])
    .config(appConfig)
    .run(startLogic);

  appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function appConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/core/layout.html',
        controller: 'SheetCtrl as scvm' // 绑定的试图完成事件, 会广播给大家
      });

    $urlRouterProvider.otherwise('/');
  }

  startLogic.$inject = ['$rootScope', 'userService', 'workBookService', 'coreCF'];
  function startLogic($rootScope, userService, workBookService, config) {
    window.debug = true;
    var spk = config.spreadKey;

    // 监听模板是否加载完毕
    $rootScope.$on(spk.go, function(e) {
      userService.initialize()
        .then(function(user) {
  console.info('初始用户', user);
          workBookService.initialize()
            .then(function(workBook) {
  console.info('初始工作簿', workBook);
              workBookService.selected(0);
            });
        });
    });
  }

})();



