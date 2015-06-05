(function() {
  'use strict';

  angular
    .module('platform.user')
    .factory('userService', userService);

  userService.$inject = ['$rootScope', 'userBean', 'dataService', 'coreCF'];
  function userService($rootScope, userBean, dataService, config) {
    var service = {
      'initialize': initialize,
      'setStatus': setStatus
    };
    var priv = {
      'user': null
    };
    var spk = config.spreadKey;
    return service;

    // 启动吧, 启动吧, 启动吧, 重要的事要说三遍
    function initialize() {
      var key = config.userCookieKey, userInfoMeta = {};
      var userData = getUserDataByCookie(key); // 格式化后

      if (userData.uid) { userInfoMeta.uid = userData.uid; }
      if (userData.secretKey) { userInfoMeta.secretKey = userData.secretKey; }

      return getUserInfo(userInfoMeta)
        .then(function(user) {
          if(user) {
            var key = config.statusKey + user.id;
            var status = dataService.getItem(key);
            user.setStatus(status);
console.info('状态', status);
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
      var skey = config.statusKey + priv.user.id;
      var status = dataService.getItem(skey);
      status[key] = value;
      priv.user.setStatus(status); // 同步一下
      dataService.setItem(skey, status);
      return status;
    }

    /**
     * 从cookie获取公共域的用户数据并格式化
     * @param  {String} key cookie key
     * @return {Object} 格式化后的对象 || {}
     */
    function getUserDataByCookie(key) {
      var userData = {};
      var ckobj = dataService.getCookieObj(key);
      if (ckobj && ckobj.dims) {
        if (ckobj.dims.uid) { userData.uid = ckobj.dims.uid; }
        if (ckobj.dims.secretKey) { userData.secretKey = ckobj.dims.secretKey; }
      }
      return userData;
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
            priv.user = userBean.parse(userSource);
            $rootScope.$broadcast(spk.userChange, priv.user);
          }
          return priv.user;
        });
    }
  }
})();