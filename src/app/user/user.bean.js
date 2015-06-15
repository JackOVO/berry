(function() {
  'use strict';

  angular
    .module('platform.user')
    .factory('userBean', userBean);

  function userBean () {
    var service = {
      'parse': parse
    };
    // 方便其他模块读取数据
    User.prototype.setStatus = function(status){ this.status = status; };
    return service;

    function User(id, name, group) {
      this.id = id;
      this.name = name;
      this.group = group;
    }

    /**
     * 由后台源解析成前台实体
     * @param  {Object} source 后台源数据
     * @return {Object} 解析后的实体
     */
    function parse(source) {
      var id = source.userID;
      var name = source.userName;
      var group = source.userType;

      return new User(id, name, group);
    }
  }
})();