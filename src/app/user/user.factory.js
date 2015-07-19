(function() {
  'use strict';

  angular
    .module('pf.user')
    .factory('userFactory', userFactory);

  userFactory.$inject = ['dataService'];
  function userFactory(dataService) {
    var service = {
      'rqUserInfo': rqUserInfo
    };
    return service;

    /**
     * 用户类
     * @param {String} id     后台ID
     * @param {String} type   类型决定展现等
     * @param {String} name   用户名
     * @param {Object} record 记录用户配置操作等
     */
    function User(id, type, name, record) {
      this.id = id;
      this.type = type;
      this.name = name;
      this.record = record;
    }

    /**
     * 请求会话用户信息
     * @return {User} 解析后的用户对象
     */
    function rqUserInfo() {
      var param = {}; // 免登陆预留

      return dataService.get('userInfo')
        .then(function(userInfoSource) {
          if (userInfoSource) {
            return parse(userInfoSource);
          } else {
            return null;
          }
      });
    }

    /**
     * 解析为用户对象
     * @param  {Object} source 后台源数据
     * @return {User}
     */
    function parse(source) {
      var id = source.userID;
      var name = source.userName;
      var type = source.userType;
      var record = {};

      return new User(id, name, type, record);
    }
  }

})();