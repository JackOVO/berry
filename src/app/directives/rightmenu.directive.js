(function() {
  'use strict';

  angular
    .module('platform.directive')
    .directive('rightmenu', rightmenuDirective)
    .factory('rightMenuService', rightMenuService);

  function rightmenuDirective() {
    return {
      templateUrl: 'app/template/rightmenu.html',
      link: function(scope, element, attr) {
console.info(element);
      }
    }
  }

  // 新建文件
  function rightMenuService() {
    var service = {};
    return service;
  }

})();