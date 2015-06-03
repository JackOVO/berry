(function() {
  'use strict';

  angular
    .module('platform.core', ['ngCookies'])
    .constant('coreCF', {
      userCookieKey: 'userData',
      baseUrl: 'http://localhost:5323/platform/',
      loginUrl: 'http://localhost:3000/login.html',
      urlMap: {
        'userInfo': 'userInfo.do',
        'workBook': 'jump.do'
      },
      // 传播关键字
      spreadKey: {
        'userChange': 'uc',
        'tableChange': 'tc',
        'workBookChange': 'wbc',
        'nowConditionChange': 'ncc',
        'selectedSheetChange': 'ssc'
      },
      condition: {
        'dims': '[{"codeName":"indicatorCode",' +
        '"codes": ["00010000000058", "00030000038935", "00010000348458"]}]',
        'productID': '00010000000000000000000000000001'
      }
    });

})();