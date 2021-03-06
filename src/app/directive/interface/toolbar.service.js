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
      'toggleStatus': toggleStatus,
      'updateStatusByVal': updateStatusByVal,
      'toggleGroupChild': toggleGroupChildStatus,
      'getData': function(){ return _toolbar; }
    };
    return service;

    // 擦擦擦擦擦擦
    function ex(key, fkey) {
console.info(key, fkey);
      var value = null;
      switch(key) {
        case 'file': dispatchService.execution('mydb', ['mydb']); break;
        case 'less': case 'carry':
          value = _toolbar[key].val;
          dispatchService.execution(value, ['hd-move']);
          break;
        case 'e': case 'percent':
          value = getStatusStyle(key);
          toggleStatus(key); // 切换状态
          dispatchService.execution(value, ['hd-calc']);
          break;
        case 'line': case 'bar': case 'pie': case 'area':
          value = _toolbar[key].val;
          dispatchService.execution(value, ['chart']);
          break;
        case 'bold': // 单键
        case 'italic':
        case 'through':
          var style = getStatusStyle(key);
          toggleStatus(key); // 切换状态
          dispatchService.execution(style, ['hd-styles']);
          break;
        case 'deal': // 组执行键
          var styled = getChildStyle(fkey, key);
          dispatchService.execution(styled, ['hd-styles']);
          break;
        case 'more': // 组更多键
          toggleGroupChildStatus(fkey, key, true);
          var offset = getPanelOffset(fkey), cName = 'list';

          if (fkey === 'color' || fkey === 'bg') { cName += ' color-container'; }

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
      return {'top': offset.top + fele.height() - 1, 'left': offset.left};
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
      return attr + ':' + val;
    }

    // 激活按钮组子项
    function toggleGroupChildStatus(fkey, key, isOPQ) {
      if (isOPQ === undefined) {
        isOPQ = !_toolbar[fkey]['childs'][key].jq.hasClass('active');
      }
      if (isOPQ) {
        _toolbar[fkey].jq.addClass('hover');
        _toolbar[fkey]['childs'][key].jq.addClass('active');

if(_up.length && _up[0] !== fkey) { toggleGroupChildStatus(_up[0],_up[1], false); }
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

    // 切换状态
    function toggleStatus(key, tsp) {
      var item = _toolbar[key]; 
      if (tsp !== undefined) { item.status = tsp; } // 固定切换

      var status = item.status;
      if (status === 'none') { item.status = 'hover'; }
      else if (status === 'hover') { item.status = 'none'; }
      item.jq.removeClass(status).addClass(item.status);
    }

    // 从值反射更新状态
    function updateStatusByVal(key, val) {
      var item = _toolbar[key], nowStatus = null;
      angular.forEach(item.smap, function(v, status) {
        if (v === val) { item.status = status; } // 当前值对应的状态
      });
      toggleStatus(key); // 状态固定, 反向切换
    }
  }

  var _toolbar = {
    'file': {icon:'file'},
    'refresh': {icon:'refresh'},
    'download': {icon:'down'},
    'l1': {type: 'line'},
    'font': {info:'字体', childs:{
      'deal': {val:'微软雅黑', attr:'font-family',
              style:{'width':'72px'}, dfval: '微软雅黑',
              upval: function(jq, v){ jq.children('.font-container').html(v); }},
      'more': {val:'font-more', icon:'small-arrow'}
      }
    },
    'l2': {type: 'line'},
    'size': {info:'字号', childs:{
      'deal': {val:'16', attr:'font-size', dfval: '16',
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
    'through': {info:'删除线', icon:'strikethrough', attr:'text-decoration',
             status:'none', smap:{'hover':'blink', 'none':'line-through'}
    },
    'color': {info:'颜色', childs:{
      'deal': {val:'red', attr:'color', dfval: 'red',
              icons:['color', $('<span class="icon-swy">')], 
              upval: function(jq, v){
                jq.find('.icon-swy').css('background-color', v);
              }},
      'more': {val:'font-more', icon:'small-arrow'}
      }
    },
    'l4': {type: 'line'},
    'align': {info:'对齐', childs:{
      'deal': {val:'left', icon:'left', attr:'text-align', dfval: 'left',
              upval: function(jq, v){
                jq.find('.icon').removeClass().addClass('icon '+'icon-'+(v==='center'?'middle':v));
              }},
      'more': {val:'font-more', icon:'small-arrow'}
      }
    },
    'bg': {info:'背景', childs:{
      'deal': {val:'red', attr:'background-color',  dfval: 'red',
              icons:['background', $('<span class="icon-swy2"></span>')],
              upval: function(jq, v){
                jq.find('.icon-swy2').css('background-color', v);
              }},
      'more': {val:'font-more', icon:'small-arrow'}
      }
    },
    'l5': {type: 'line'},
    'line': {info:'折线图', icon:'broken', val: 'Line'},
    'bar': {info:'柱状图', icon:'column', val: 'Bar'},
    'pie': {info:'饼图', icon:'pie', val: 'Pie'},
    'area': {info:'面积图', icon:'curve', val: 'Area'},
    'l6': {type: 'line'},
    'e': {info:'对数', icon:'e', attr:'e', status:'none',
          smap:{'hover':false, 'none':true}
    },
    'percent': {info:'百分比', icon:'percent', attr:'percent', status:'none',
          smap:{'hover':false, 'none':true}
    },
    'carry': {info:'前移', icon:'carry', val: 1},
    'less': {info:'后移', icon:'less', val: -1},
  };

})();
