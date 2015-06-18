(function() {
  'use strict';

  angular
    .module('platform.core', ['platform.error'])
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
        'search': 'search.do',
        'workBook': 'jump.do',
        'recommend': 'recmd.do',
        'userInfo': 'userInfo.do'
      },
      // 传播关键字
      spreadKey: {
        'go': 'orz',
        'userChange': 'uc',
        'tableChange': 'tc',
        'workBookChange': 'wbc',
        'conditionChange': 'nc',
        'sheetChange': 'sc',

        'rightMenuDataChange': 'rmdc',
        'rightMenuPropertyChange': 'rmrc',
      },
      // 默认测试条件
      gundom: {
        'dims': [
          {'codeName':'indicatorCode', 'codes': ['00010000000058', '00030000038935', '00010000000059']}
        ],
        'productID': '00010000000000000000000000000001'
      }
    });

})();