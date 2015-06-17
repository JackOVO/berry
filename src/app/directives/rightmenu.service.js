(function() {
  'use strict';

  angular
    .module('platform.directive')
    .factory('rightMenuService', rightMenuService);

  rightMenuService.$inject = ['$rootScope', 'coreCF'];
  function rightMenuService($rootScope, config) {
    var _menuData = [];
    var _property = {}; // 控制菜单显示
    var service = {
      'show': showMenu,
      'hide': hideMenu,
      'setData': setData,
      'setClick': setClick,
      'click': function(){}
    };

    var spk = config.spreadKey;

    return service;

    function setData(data) {
      _menuData = data;
      $rootScope.$broadcast(spk.rightMenuDataChange, _menuData);
    }

    function setClick(callback) {
      service.click = callback;
    }

    function showMenu(top, left) {
      _property.top = top;
      _property.left = left;
      _property.show = true;

      $rootScope.$broadcast(spk.rightMenuPropertyChange, _property);
    }

    function hideMenu() {
      _property.show = false;
      $rootScope.$broadcast(spk.rightMenuPropertyChange, _property);
    }
  }

})();