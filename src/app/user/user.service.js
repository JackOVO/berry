(function() {
  'use strict';

  angular
    .module('platform.user')
    .factory('userService', userService);

  userService.$inject = ['$rootScope', 'userBean', 'dataService', 'coreCF'];
  function userService($rootScope, userBean, dataService, config) {
    var service = {
      'initialize': initialize
    };
    var priv = {
      'user': null
    };
    var spk = config.spreadKey;
    return service;

    // 启动吧, 启动吧, 启动吧, 重要的事要说三遍
    function initialize() {
      var key = config.userCookieKey;
      var userData = dataService.getCookieObj(key);
console.info(userData);
      var userInfoMeta = {}; // 外接口免登陆?
      if (userData.dims.uid) { userInfoMeta.uid = userData.dims.uid; }
      if (userData.dims.secretKey) { userInfoMeta.secretKey = userData.dims.secretKey; }

      getUserInfo(userInfoMeta)
        .then(function(userInfo) {
          // 判断处理
        });
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