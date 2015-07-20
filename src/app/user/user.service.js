(function() {
  'use strict';

  angular
    .module('pf.user')
    .factory('userService', userService);

  userService.$inject = ['$q', 'dataService', 'userFactory', 'errorService'];
  function userService($q, dataService, userFactory, errorService) {
    var _user = null; // 会话用户
    var service = {
      'login': login,
      'initialize': initialize,
      'getSessionUser': getSessionUser
    };
    return service;

    /**
     * 初始服务
     * @return {User} Orz|Null
     */
    function initialize() {
      return getSessionUser().then(function(user) {
        if (user) { _user = user; }
        else { errorService.swallow(errorService.NotLoggedIn); }
        return _user;
      });
    }

    /**
     * 获取回话用户类
     * @return {User} 用户对象|null
     */
    function getSessionUser() {
      return userFactory.rqUserInfo().then(function(user) {
        return user;
      });
    }

    /**
     * 用户登陆, 登陆失败处理
     * @param  {String} name       用户名
     * @param  {String} password   密码
     * @param  {String} verifycode 验证码
     * @return {Object}            未处理的消息
     */
    function login(name, password, verifycode) {
      var params = {
        'passName': name,
        'password': password,
        'verifyCode': verifycode
      };

      return dataService.post('login', params).then(function(message) {
        if (message.success === true) {
          return message;
        } else {
          return $q.reject(message);
        }
      });
    }

  }

})();