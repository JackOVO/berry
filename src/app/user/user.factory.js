(function() {
  'use strict';

  angular
    .module('platform.user')
    .factory('userFactory', userFactory);

  function userFactory() {
    var service = {
      'parse': parse
    };
    User.prototype.addRecord = function(key, value) { this.record[key] = value; };
    return service;

    // 前台用户类
    function User(id, type, name, record) {
      this.id = id;
      this.type = type;
      this.name = name;
      this.record = record;
    }

    /**
     * 由后台源解析成前台实体
     * @param  {Object} source 后台源数据
     * @return {Object} 解析后的实体
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