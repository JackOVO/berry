(function() {
  'use strict';

  angular
    .module('platform', [
      'ui.router',
      'ngResource',
      'ngSanitize',
      'platform.core',
      'platform.user'
    ])
    .config(appConfig)
    .run(startLogic);

  appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function appConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/core/layout.html',
        //controller: 'SheetCtrl', // 绑定的试图完成事件, 会广播给大家
        //controllerAs: 'scvm'
      });

    $urlRouterProvider.otherwise('/');
  }

  startLogic.$inject = ['userService'];
  function startLogic(userService) {
    userService.initialize()  
      .then(function(user) {

      });
  }

})();


// (function() {
//   'use strict';

//   angular
//     .module('platform', [
//       'platform.directive',
//       'ui.router',
//       'ngResource',
//       'ngSanitize'])
//     .config(appConfig)
//     .run(startLogic);

//   startLogic.$inject = [
//     '$rootScope',
//     'userService',
//     'workBookService',
//     'coreCF'
//   ];

//   function startLogic ($rootScope, userService, workBookService, config) {
//     $.cookie.json = true;
//     window.debug = true;
//     var spk = config.spreadKey;

//     // 监听模板渲染完成事件
//     $rootScope.$on(spk.go, function(e) {
// console.info('启动!');
//       userService.initialize()
//         .then(function(user) {
//           if (user) {
//             workBookService.initialize()
//               .then(function() {
//                 workBookService.selected(user.status.sheetIndex || 0);
//             });
//           } else {

//           }
//         });
//     });
//   }



// })();



