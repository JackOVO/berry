(function() {
  'use strict';
  // 工具条控制器, 方法转移

  angular
    .module('pf.directive')
    .factory('toolbarService', toolbarService);

  toolbarService.$inject = ['dispatchService'];
  function toolbarService(dispatchService) {
    var service = {
      'inform': inform,
      'getToolbarArr': function(){ return arr; }
    };
    return service;

    // 由dom触发的
    function inform(key, fkey, status) {
      var mf = key.toLowerCase();
console.info(key, fkey);

      // 子
      switch(mf) {
        case 'line': case 'bar': case 'pie': case 'area':
          dispatchService.execution(key, ['chart']); break;
          /*    font-weight: normal;
    font-style: normal;
    text-decoration: blink;*/
        case 'bold':
          var val = (status.active === true ? 'bold' : 'normal');
          dispatchService.execution('font-weight:' + val, ['hd-styles']); break;
        case 'italic':
          var val = (status.active === true ? 'italic' : 'normal');
          dispatchService.execution('font-style:' + val, ['hd-styles']); break;
        case 'through':
          var val = (status.active === true ? 'line-through' : 'blink');
          dispatchService.execution('text-decoration:' +  val, ['hd-styles']); break;
        case 'carry': dispatchService.execution(1, ['hd-floatSize']); break;
        case 'less': dispatchService.execution(-1, ['hd-floatSize']); break;
        case 'e': dispatchService.execution('e:'+status.active, ['hd-calc']); break;
        case 'percent': dispatchService.execution('percent:'+status.active, ['hd-calc']); break;
        default: break;
      }

      // 父
      switch(fkey) {
        case 'font': dispatchService.execution('font-family:'+key, ['hd-styles']); break;
        case 'size': dispatchService.execution('font-size:'+key, ['hd-styles']); break;
        case 'color': dispatchService.execution('color:'+key, ['hd-styles']); break;
        case 'align': dispatchService.execution('text-align:'+key, ['hd-styles']); break;
        case 'background':
          dispatchService.execution('background-color:'+key, ['hd-styles']);
          break;
        default: break;
      }
    }
  }

})();

// case 'hd-decoration':
//   var style = {'text-decoration': key};
//   handsontableService.addSelectedAreaStyle(style);
//   break;
// case 'hd-style':
//   var style = {'font-style': key};
//   handsontableService.addSelectedAreaStyle(style);
//   break;
// case 'hd-align':
//   var style = {'text-align': key};
//   handsontableService.addSelectedAreaStyle(style);
//   break;
// case 'hd-font':
//   var style = {'font-family': key};
//   handsontableService.addSelectedAreaStyle(style);
//   break;
// case 'hd-size':
//   var style = {'font-size': key};
//   handsontableService.addSelectedAreaStyle(style);
//   break;
// case 'hd-bg':
//   var style = {'background-color': key};
//   handsontableService.addSelectedAreaStyle(style);
//   break;
// case 'hd-bold':
//   var style = {'font-weight': key};
//   handsontableService.addSelectedAreaStyle(style);
//   break;
// case 'hd-color':
//   var style = {'color': key};
//   handsontableService.addSelectedAreaStyle(style);
//   break;