(function() {
  'use strict';

  angular
    .module('platform', [
      'ui.router',
      'ngResource',
      'ngSanitize',
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
        controller: 'SheetCtrl as scvm'
      });

    $urlRouterProvider.otherwise('/');
  }

  startLogic.$inject = [
    '$timeout', '$rootScope',
    'userService', 'workBookService',
    'coreCF'
  ];
  function startLogic($timeout, $rootScope, userService, workBookService, config) {
    var _spk = config.spreadKey;

    // 监听表控制器加载完成
    // 会存在页面未加载完毕, 控制器无法监听到事件
    $rootScope.$on(_spk.sheetCtrlLoadComplete, function(e, str) {
      // 初始化用户
      userService.initialize().then(function(user) {
        var gundam = user.record['gundam'];
        // 初始化工作簿
        workBookService.initialize(gundam).then(function(workBook) {
          // 选择一个表
          workBookService.selectSheet(0);
        });
      });
    });

  }

})();


// (function() {
//   'use strict';
// // 纵观全局
//   angular
//     .module('platform', [
//      
//       'platform.core',
//       'platform.user',
//       'platform.workbook',
//       'platform.directive'
//     ])
//     .config(appConfig)
//     .run(startLogic);



//   startLogic.$inject = ['$rootScope', 'userService', 'workBookService', 'coreCF'];
//   function startLogic($rootScope, userService, workBookService, config) {
//     window.debug = true;
//     var spk = config.spreadKey;

//     // 监听模板是否加载完毕
//     $rootScope.$on(spk.go, function(e) {
//       userService.initialize()
//         .then(function(user) {
//   console.info('初始用户', user);
//           workBookService.initialize()
//             .then(function(workBook) {
//   console.info('初始工作簿', workBook);
//               workBookService.selected(0);
//             });
//         });
//     });
//   }

// })();



