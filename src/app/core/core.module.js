(function() {
  'use strict';
  // 核心模块, 提供基础功能

  angular
    .module('platform.core', [])
    .constant('coreCF', {
      openDimCode: 'indicatorCode',
      // 本地存储key
      record: 'record',
      userCookieKey: 'userData',
      globalGundomKey: 'gundom',
      // 地址映射
      domain: 'dfinder.cn',
      baseUrl: 'http://localhost:5323/platform/',
      loginUrl: 'http://localhost:3000/login.html',
      urlMap: {
        'sync': 'dim.do',
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
        'sheetCtrlLoadComplete': 'sclc',

        'accContentBridge': 'acb', // 手风琴内容控制器转播监听
        'searchSelectNodeChange': 'ssnc', // 搜索选中变更
        'dimSelectedChange': 'dsc', // 维度选中变成, 向上通知变更条件和同步状态
        'syncStatusChange': 'ssc', // 同步状态变更

        'rightMenuDataChange': 'rmdc',
        'rightMenuPropertyChange': 'rmrc',
        // 动作通知
        'getRecommend': 'gr',
        'refreshRecommend': 'rir',
        'askRecommendRefresh': 'arr',
        'containerSizeChange': 'csc' // 容器大小变更
      },
      // 测试钢弹
      gundom: {
        'dims': [
          {
            'codeName':'indicatorCode',
            'codes': ['00030000039266']
          }
        ],
        'productID': '00010000000000000000000000000001'
      }
    });
// 00030000039266 GDP
// '00010000624458', '00030000036343', '00010000107190'
})();