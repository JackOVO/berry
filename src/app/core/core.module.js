(function() {
  'use strict';

  angular
    .module('platform.core', ['ngCookies', 'platform.error'])
    .constant('coreCF', {
      // 本地存储key
      statusKey: 'status',
      userCookieKey: 'userData',
      globalGundomKey: 'gundom',
      // 地址映射
      domain: 'dfinder.cn',
      baseUrl: 'http://localhost:5323/platform/',
      loginUrl: 'http://localhost:3000/login.html',
      urlMap: {
        'userInfo': 'userInfo.do',
        'workBook': 'jump.do'
      },
      // 传播关键字
      spreadKey: {
        'go': 'orz',
        'userChange': 'uc',
        'tableChange': 'tc',
        'workBookChange': 'wbc',
        'nowConditionChange': 'ncc',
        'selectedSheetChange': 'ssc'
      },
      // 默认测试条件
      gundom: {
        'dims': [
          {"codeName":"indicatorCode",
              "codes": ["00010000000058", "00030000038935"]}
        ],
        'productID': '00010000000000000000000000000001'
      }
    });

})();