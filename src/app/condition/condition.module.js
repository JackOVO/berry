(function() {
  'use strict';
  // 条件模块

  angular
    .module('platform.condition', [
      'ui.sortable',
      'platform.dimension', 'platform.sheet',
      'platform.indicator', 'platform.search'
    ]);

})();