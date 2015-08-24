(function() {
  'use strict';
  // 工具条控制器, 方法转移

  angular
    .module('pf.directive')
    .factory('toolbarService', toolbarService);

  toolbarService.$inject = ['dispatchService'];
  function toolbarService(dispatchService) {
    var service = {
      'inform': inform
    };
    return service;

    // 由dom触发的
    function inform(key, fkey) {
      var mf = key.toLowerCase();
console.info(key, fkey);

      // 子
      switch(mf) {
        case 'line': case 'bar': case 'pie': case 'area':
          dispatchService.execution(key, ['chart']);
          break;
        default: break;
      }

      // 父
      switch(fkey) {
        case 'background':
          dispatchService.execution('red', ['handsontable-bg']);
          break;
        default: break;
      }
    }
  }

})();