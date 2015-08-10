(function() {
  'use strict';
  // 核心模块, 提供基础功能

  angular
    .module('pf.core', ['ngDialog'])
    .constant('coreCF', {
      debug: true,
      openDimCode: 'indicatorCode',
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
        'init': 'jump.do',
        'login': 'login.do',
        'sheet': 'sheet.do',
        'initial': 'jump.do',
        'search': 'search.do',
        'recommend': 'recmd.do',
        'userInfo': 'userInfo.do',
        'information': 'info.do'
      },
      // 监听事件的关键字
      spreadKey: {
        // 动作告知
        'loading': 'load',
        'syncWorkBook': 'swb',
        'refreshRecommend': 'rr',
        'InfoIsOpenChange': 'iic',
        'getRecommendChange': 'grc',
        'containerSizeChange': 'csc',

        'createRightMenu': 'crm',
        'toggleRightMenu': 'trm', // 切换显示隐藏状态
        'bridgeNow': 'bn', // 桥梁
        // 变更通知
        'sheetChange': 'sc',
        'workbookChange': 'wc',
        'conditionChange': 'cc',
        // 状态通知
        'syncStatusChange': 'ssc', // 同步状态
        'dimSelectedChange': 'dsc', // 维度选中
        'searchSelectNodeChange': 'ssnc'
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