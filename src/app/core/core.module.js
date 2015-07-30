(function() {
  'use strict';
  // 核心模块, 提供基础功能

  angular
    .module('pf.core', ['ngDialog'])
    .constant('coreCF', {
      debug: true,
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
        'login': 'login.do',
        'sheet': 'sheet.do',
        'initial': 'jump.do',
        'userInfo': 'userInfo.do'
      },
      // 监听事件的关键字
      spreadKey: {
        // 变更通知
        'sheetChange': 'sc',
        'workbookChange': 'wc'
      },
      dime: {
        'dims': [
          {
            'codeName':'indicatorCode',
            'codes': ['00010000624458', '00030000039266', '00010000000058','00010000000066','00010000000739','00010000001732','00010000001735','00010000001737']
          }
        ],
        'productID': '00010000000000000000000000000001'
      }
    });

})();