(function() {
  'use strict';
  // 核心模块, 提供基础功能

  angular
    .module('pf.core', ['ngDialog'])
    .constant('coreCF', {
      // 本地存储KEY
      record: 'record', // 用户Local存储拼接
      dimeKey: 'userData', // 维度
      // 基础链接
      domain: 'dfinder.cn',
      baseUrl: 'http://localhost:5323/platform/',
      loginUrl: 'http://localhost:3000/login.html',
      // 请求地址映射
      urlMap: {
        'sync': 'dim.do',
        'initial': 'jump.do',
        'login': 'login.do',
        'userInfo': 'userInfo.do'
      }
    });

})();