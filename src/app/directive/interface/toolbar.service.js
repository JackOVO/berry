(function() {
  'use strict';

  angular
    .module('pf.directive')
    .factory('toolbarService', toolbarService);

  toolbarService.$inject = ['$rootScope', 'panelService', 'dispatchService'];
  function toolbarService($rootScope, panelService, dispatchService) {
     var _up = [];
    var service = {
      'ex': ex,
      'updateValue': updateValue,
      'toggleGroupChild': toggleGroupChildStatus,
      'getData': function(){ return _toolbar; }
    };
    return service;

    // 擦擦擦擦擦擦
    function ex(key, fkey) {
console.info(key, fkey);
      switch(key) {
        case 'bold': // 单键
        case 'italic':
        case 'through':
          var style = getStatusStyle(key);
          updateStatus(key); // 切换状态
          dispatchService.execution(style, ['hd-styles']);
          break;
        case 'deal': // 组执行键
          var style = getChildStyle(fkey, key);
          dispatchService.execution(style, ['hd-styles']);
          break;
        case 'more': // 组更多键
          toggleGroupChildStatus(fkey, key, true);
          var offset = getPanelOffset(fkey), cName = 'list';

          if (fkey === 'color') { cName += ' color-container'; }

          panelService.open({
            cName: cName, style: offset,
            template: 'app/template/panel/'+ fkey +'-list.html',
          });
          $rootScope.$apply();
          break;
      }
    }

    // 获取弹出框位置
    function getPanelOffset(fkey) {
      var fele = _toolbar[fkey].jq;
      var offset = fele.offset();
      return {'top': offset.top + fele.height() - 1, 'left': offset.left}
    }

    // 获取指定见样式
    function getStatusStyle(key) {
      var item = _toolbar[key];
      var attr = item.attr, val = item.smap[item.status];
      return attr + ':' + val;
    }

    // 获取子项结果样式
    function getChildStyle(fkey, key) {
      var val = _toolbar[fkey]['childs'][key].val;
      var attr = _toolbar[fkey]['childs'][key].attr;

      if (fkey === 'size') { val += 'px'; }

      return attr + ':' + val;
    }

    // 激活按钮组子项
    function toggleGroupChildStatus(fkey, key, op) {
      if (op === undefined) { op = !_toolbar[fkey]['childs'][key].jq.hasClass('active'); }
      if (op) {
        _toolbar[fkey].jq.addClass('hover');
        _toolbar[fkey]['childs'][key].jq.addClass('active');

        if(_up.length) { toggleGroupChildStatus(_up[0],_up[1], false); }
        _up[0] = fkey; _up[1] = key;
      } else {
        _toolbar[fkey].jq.removeClass('hover');
        _toolbar[fkey]['childs'][key].jq.removeClass('active');
      }
    }

    // 更新值, 并执行
    function updateValue(fkey, key, value) {
      var item = _toolbar[fkey]['childs'][key];
      item.val = value; item.upval(item.jq, value);
      ex(key, fkey);
    }

    // 更新状态
    function updateStatus(key) {
      var item = _toolbar[key];
      var status = item.status;
      if (status === 'none') { item.status = 'hover'; }
      else if (status === 'hover') { item.status = 'none'; }
      item.jq.removeClass(status).addClass(item.status);
    }
  }

  var _toolbar = {
    'file': {icon:'file'},
    'refresh': {icon:'refresh'},
    'download': {icon:'down'},
    'l1': {type: 'line'},
    'font': {info:'字体', childs:{
      'deal': {val:'黑体', attr:'font-family', style:{'width':'72px'},
              upval: function(jq, v){ jq.children('.font-container').html(v); }},
      'more': {val:'font-more', icon:'small-arrow'}
      }
    },
    'l2': {type: 'line'},
    'size': {info:'字号', childs:{
      'deal': {val:'16', attr:'font-size',
              upval: function(jq, v){ jq.children('.font-container').html(v); }},
      'more': {val:'font-more', icon:'small-arrow'}
    }},
    'l3': {type: 'line'},
    'bold': {info:'粗体', icon:'blod', attr:'font-weight', status:'none',
             smap:{'hover':'normal', 'none':'bold'}
    },
    'italic': {info:'斜体', icon:'italics', attr:'font-style', status:'none',
             smap:{'hover':'normal', 'none':'italic'}
    },
    'through': {info:'删除线', icon:'strikethrough', attr:'text-decoration', status:'none',
             smap:{'hover':'blink', 'none':'line-through'}
    },
    'color': {info:'颜色', childs:{
      'deal': {val:'red', icons:['color', $('<span class="icon-swy">')], attr:'color',
              upval: function(jq, v){ jq.find('.icon-swy').css('background-color', v); }},
      'more': {val:'font-more', icon:'small-arrow'}
      }
    },
    'l4': {type: 'line'},
    'align': {info:'对齐', childs:{
      'deal': {val:'left', icon:'left', attr:'text-align',
              upval: function(jq, v){}},
      'more': {val:'font-more', icon:'small-arrow'}
      }
    },
    //     {'key':'background', 'type': 'group', childs: [
    //       {'key':'show', 'fill': {'name': 'background', 'nail': '<span class="icon-swy2"></span>'}},
    //       {'key':'more', 'type': 'more', 'icon':'small-arrow', 'style':{'line-height':'10px'}}
    //     ]},

    //     {'key':'color','type': 'group', childs: [
    //       {'key':'show','fill': {'name': 'color', 'nail': '<span class="icon-swy"></span>'}},
    //       {'key':'more','type': 'more', 'icon':'small-arrow', 'style':{'line-height':'10px'}}
    //     ]},
    //     {'type': 'line'},
    /*
    // 'color': {'info':'颜色', childs:{
    //   'deal': {val:'red', icons: ['color', $('<span class="icon-swy">')], attr:'color'},
    //   'more': {val:'color-more', icon:'small-arrow'}
    // }}*/
  };

  // {'key':'size', 'type': 'group', childs: [
  // //       {'key':'show', 'type':'more', 'ctype':'font', 'fill':'12' },
  // //       {'key':'more', 'type':'more', 'icon':'small-arrow', 'style':{'line-height':'10px'}}
  // //     ]},

})();

// (function() {
//   'use strict';
//   // 工具条控制器, 方法转移

//   angular
//     .module('pf.directive')
//     .factory('toolbarService', toolbarService);

//   toolbarService.$inject = ['dispatchService'];
//   function toolbarService(dispatchService) {
//     var service = {
//       'inform': inform,
//       'getToolbarArr': function(){ return arr; }
//     };
//     return service;

//     // 由dom触发的
//     function inform(key, fkey, status) {
//       var mf = key.toLowerCase();
// console.info(key, fkey);

//       // 子
//       switch(mf) {
//         case 'line': case 'bar': case 'pie': case 'area':
//           dispatchService.execution(key, ['chart']); break;
//           /*    font-weight: normal;
//     font-style: normal;
//     text-decoration: blink;*/
//         case 'bold':
//           var val = (status.active === true ? 'bold' : 'normal');
//           dispatchService.execution('font-weight:' + val, ['hd-styles']); break;
//         case 'italic':
//           var val = (status.active === true ? 'italic' : 'normal');
//           dispatchService.execution('font-style:' + val, ['hd-styles']); break;
//         case 'through':
//           var val = (status.active === true ? 'line-through' : 'blink');
//           dispatchService.execution('text-decoration:' +  val, ['hd-styles']); break;
//         case 'carry': dispatchService.execution(1, ['hd-floatSize']); break;
//         case 'less': dispatchService.execution(-1, ['hd-floatSize']); break;
//         case 'e': dispatchService.execution('e:'+status.active, ['hd-calc']); break;
//         case 'percent': dispatchService.execution('percent:'+status.active, ['hd-calc']); break;
//         default: break;
//       }

//       // 父
//       switch(fkey) {
//         case 'font': dispatchService.execution('font-family:'+key, ['hd-styles']); break;
//         case 'size': dispatchService.execution('font-size:'+key, ['hd-styles']); break;
//         case 'color': dispatchService.execution('color:'+key, ['hd-styles']); break;
//         case 'align': dispatchService.execution('text-align:'+key, ['hd-styles']); break;
//         case 'background':
//           dispatchService.execution('background-color:'+key, ['hd-styles']);
//           break;
//         default: break;
//       }
//     }
//   }

// })();

// // case 'hd-decoration':
// //   var style = {'text-decoration': key};
// //   handsontableService.addSelectedAreaStyle(style);
// //   break;
// // case 'hd-style':
// //   var style = {'font-style': key};
// //   handsontableService.addSelectedAreaStyle(style);
// //   break;
// // case 'hd-align':
// //   var style = {'text-align': key};
// //   handsontableService.addSelectedAreaStyle(style);
// //   break;
// // case 'hd-font':
// //   var style = {'font-family': key};
// //   handsontableService.addSelectedAreaStyle(style);
// //   break;
// // case 'hd-size':
// //   var style = {'font-size': key};
// //   handsontableService.addSelectedAreaStyle(style);
// //   break;
// // case 'hd-bg':
// //   var style = {'background-color': key};
// //   handsontableService.addSelectedAreaStyle(style);
// //   break;
// // case 'hd-bold':
// //   var style = {'font-weight': key};
// //   handsontableService.addSelectedAreaStyle(style);
// //   break;
// // case 'hd-color':
// //   var style = {'color': key};
// //   handsontableService.addSelectedAreaStyle(style);
// //   break;