(function() {
  'use strict';

  angular
    .module('pf.user')
    .factory('userService', userService);

  userService.$inject = ['dataService', 'userFactory', 'errorService'];
  function userService(dataService, userFactory, errorService) {
    var _user = null; // 会话用户
    var service = {
      'initialize': initialize,
      'getUser': getUser
    };
    return service;

    /**
     * 初始服务
     * @return {User} Orz|Null
     */
    function initialize() {
      return getUser().then(function(user) {
        if (user) { _user = user; }
        else { errorService.swallow(errorService.NotLoggedIn); }
        return _user;
      });
    }

    /**
     * 获取回话用户类
     * @return {User} 用户对象|null
     */
    function getUser() {
      return userFactory.rqUserInfo().then(function(user) {
        return user;
      });
    }
  }

})();