(function() {
  'use strict';

  angular
    .module('pf', [
      'ngDialog',
      'ui.router',
      'ngResource',
      'ngSanitize',
      'ui.sortable',
      'pf.user',
      'pf.workbook',
      'pf.database',
      'pf.directive'
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

// var container = document.getElementById('basic_example');
// var data = function () {
//  return Handsontable.helper.createSpreadsheetData(10, 12);
// };

// var hot = new Handsontable(container, {
//   data: data(),
//   colHeaders: true,
//   rowHeaders: true
// });

    }

    // 启动逻辑
    startLogic.$inject = ['$rootScope', 'userService', 'workbookService', 'coreCF'];
    function startLogic($rootScope, userService, workbookService, config) {
      // 控制器加载完成, 可以初始化
      $rootScope.$on('$stateChangeSuccess', function(e) {
// console.info('run');
        // 用户初始化
        userService.initialize().then(function(user) {
          var dime = user.record.dime; // 维度记录
// console.info(user);
if (config.debug === true) { dime = config.dime; }
          // 工作簿初始化
          workbookService.initialize(dime).then(function(workbook) {
            workbookService.toggle(0, true);
          });

        });
      });
    }

})();