(function() {
  'use strict';

  angular
    .module('platform.user')
    .factory('userService', userService);

  userService.$inject = ['$q', 'dataService', 'userFactory', 'coreCF'];
  function userService($q, dataService, userFactory, config) {
    var _user = null; // 维护用户
    var service = {
      'initialize': initialize,
      'getUserInfo': getUserInfo,
      'addRecord': setUserLocalRecord,
      'getRecord': function(key){ return getUserLocalRecord(_user.id)[key]; }
    };
    return service;

    function initialize() {
      var params = {};

      return getUserInfo(params)
        .then(function(user) {
console.warn('R用户:', user);
          _user = user;
          // 获取cookie中的条件或测试条件
          var gundam = getGundamByCookie() || config.gundom;
          setUserLocalRecord('gundam', gundam); // 同步
          _user.record = getUserLocalRecord(_user.id);
          return _user;
        })
        .catch(function(message) { // 无法获取到用户的情况下
          // 可以抽取到错误或登录模块处理
          window.location.href = 'login.html';
        });
    }

    /**
     * 根据session获取用户信息
     * @param  {Object} params 附带参数, 特殊用户, 保存密码等
     * @return {Promise} 承诺, 用户为空时会拒绝
     */
    function getUserInfo(params) {
      return dataService.post('userInfo', params)
        .then(function(userSource) {
          if (userSource === null) { return $q.reject('用户信息为空!'); }
          var user = userFactory.parse(userSource);
          return user;
        });
    }

    /**
     * 覆盖用户本机记录
     * @param {String]} key
     * @param {Object} value
     * @return {Object} 当前用户的记录
     */
    function setUserLocalRecord(key, value) {
      var rkey = config.record + _user.id;
      var record = dataService.getItem(rkey);
      record[key] = value;
      dataService.setItem(rkey, record);
      angular.forEach(record, function(value, key) {
        _user.addRecord(key, value);
      });
      return _user.record;
    }

    /**
     * 获取指定用户的本地记录数据
     * @param  {String} userId
     * @return {Object} 用户记录
     */
    function getUserLocalRecord(userId) {
      var key = config.record + userId;
      var record = dataService.getItem(key);
      return record;
    }

    /**
     * 获取搜索平台传入的条件并转成gundam
     * @return {Gundam} 钢弹
     */
    function getGundamByCookie() {
      var ckString = dataService.getCookieObj(config.userCookieKey);
      var deformity = angular.fromJson(ckString);
      return deformity && {'dims': deformity.dims.dim, 'productID': deformity.dims.productID};
    }
  }

})();