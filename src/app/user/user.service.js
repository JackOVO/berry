(function() {
  'use strict';

  angular
    .module('pf.user')
    .factory('userService', userService);

  userService.$inject = [
    '$q',
    'dataService',
    'userFactory',
    'errorService',
    'coreCF'];

  function userService($q, dataService, userFactory, errorService, config) {
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
        if (user) {
          _user = user;
          if (_user.record.dime) { // 这是搜索系统存储的维度数据
            setLocalRecord('dime', _user.record.dime); // 覆盖用户操作得出维度记录
          }

          var localDime = getLocalRecord(_user.id).dime;
          _user.addRecordItem('dime', localDime);
        }
        else { errorService.swallow(errorService.NotLoggedIn); }
        return _user;
      });
    }

    /**
     * 获取会话用户类, 并同步Cookie记录
     * @return {User} 用户对象|null
     */
    function getSessionUser() {
      return userFactory.rqUserInfo().then(function(user) {
        if (user) {
          var dime = getDimeByCookie();
          user.addRecordItem('dime', dime);
        }
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

    /**
     * 获取搜索平台传入的用户数据,并转化一下
     * 获得后会清空Cookie该项数据, 因为它只做搜索跳平台初始化用,
     * 平台内刷新会根据用户操作的记录得到维度记录.
     * @return {Object}
     */
    function getDimeByCookie() {
      var dimeString = dataService.getCookieObj(config.dimeKey);
      var deformity = angular.fromJson(dimeString);
      dataService.removeCookie(config.dimeKey, {'domain': 'dfinder.cn'}); // 删除操作

      return deformity && {
        'dims': deformity.dims.dim,
        'productID': deformity.dims.productID
      };
    }

    /**
     * 覆盖指定用户本地记录
     * @param {String} key
     * @param {Object} value
     * @return {Object} 当前用户的记录
     */
    function setLocalRecord(key, value) {
      var rkey = config.record + _user.id;
      var record = dataService.getItem(rkey);
      record[key] = value;
      dataService.setItem(rkey, record);
      return getLocalRecord(_user.id);
    }

    /**
     * 获取指定用户的本地记录
     * @param  {String} userId
     * @return {Object} 用户记录
     */
    function getLocalRecord(userId) {
      var key = config.record + userId;
      var record = dataService.getItem(key);
      return record;
    }

  }

})();