(function() {
  'use strict';

  angular
    .module('platform.user')
    .factory('userService', userService);

  userService.$inject = ['$rootScope', 'userBean', 'dataService', 'coreCF'];
  function userService($rootScope, userBean, dataService, config) {
    var _user = null;
    var service = {
      'initialize': initialize
    };

    var spk = config.spreadKey;
    return service;

    // 初始化服务
    function initialize () {
      var key = config.userCookieKey, params = {};
      var current = getUserCurrentByCookie(key); // 格式化后

      // 免登陆用户信息匹配
      if (current.uid) { params.uid = current.uid; }
      if (current.secretKey) { params.secretKey = current.secretKey; }

      return getUserInfo(params)
        .then(function(user) {
          if(user) {
            var key = config.statusKey + user.id;
            var status = dataService.getItem(key);
            user.setStatus(status);
          } else {
            console.error('没有用户, 考虑处理放在那里?');
          }
          return user;
        });
    }

    /** 
     * set一个用户的状态
     * @param {String} key
     * @param {Object} value
     */
    function setStatus(key, value) {
      var skey = config.statusKey + _user.id;
      var status = dataService.getItem(skey);
      status[key] = value;
      _user.setStatus(status); // 同步一下
      dataService.setItem(skey, status);
      return status;
    }

    /**
     * 获取用户信息并set到服务中(注销, 在登录)
     * @param  {Object} params 特定用户查询参数
     * @return {Promise} 
     */
    function getUserInfo(params) {
      return dataService.post('userInfo', params)
        .then(function(userSource) {
          if(userSource) {
            _user = userBean.parse(userSource);
            $rootScope.$broadcast(spk.userChange, _user);
          }
          return _user;
        });
    }

    /**
     * 从cookie获取用户通行证并格式化(特殊免登陆用户)
     * @param  {String} key cookie key
     * @return {Object} 格式化后的对象 || {}
     */
    function getUserCurrentByCookie(key) {
      var crrent = {};
      var ckobj = dataService.getCookieObj(key);
      if (ckobj && ckobj.dims) {
        if (ckobj.dims.uid) { crrent.uid = ckobj.dims.uid; }
        if (ckobj.dims.secretKey) { crrent.secretKey = ckobj.dims.secretKey; }
      }
      return crrent;
    }

  }

})();
