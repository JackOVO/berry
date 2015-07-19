(function() {
  'use strict';
  // 核心模块, 提供基础功能

  angular
    .module('pf.core', [])
    .constant('coreCF', {
      // 本地存储KEY
      recore: 'record', // 用户Local存储拼接
      // 基础链接
      domain: 'dfinder.cn',
      baseUrl: 'http://localhost:5323/platform/',
      loginUrl: 'http://localhost:3000/login.html',
      // 请求地址映射
      urlMap: {
        'userInfo': 'userInfo.do'
      }
    });

})();