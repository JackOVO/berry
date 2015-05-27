(function() {
  'use strict';

  angular
    .module('platform.workbook', ['platform.core', 'platform.sheet'])
    .constant('workBookCF', {
      // 传播关键字
      spreadKey: {
        'wbc': 'workBookChange'
      },
      condition: {
        'dims': '[{"codeName":"indicatorCode", "codes":["00010000000058"]}]'
      }
    });
})();