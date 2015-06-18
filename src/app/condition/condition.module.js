(function() {
  'use strict';

  angular
    .module('platform.condition', [
      'ui.sortable', // 排序拖动指令
      'platform.dimension',
      'platform.recommend',
      'platform.search'
    ]);
})();