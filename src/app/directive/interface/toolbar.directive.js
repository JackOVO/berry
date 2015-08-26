(function() {
  'use strict';
  angular
    .module('pf.directive')
    .directive('toolbar', toolbarDirective);

  toolbarDirective.$inject = ['handsontableService', 'coreCF'];
  function toolbarDirective (handsontableService, config) {
    return {
      replace: true,
      scope: {'cclickk': '='},
      templateUrl: 'app/template/toolbar.html',
      link: function(scope, element, attrs, ctrl) {
        var _spk = config.spreadKey;
        var _statuCheck = []; // 由状态验证的项

        // 开始创建
        angular.forEach(_arr, function(item, index) {
          var type = item.type, iele = null;
          switch(type) {
            case 'line': iele = createLine(); break;
            case 'group': iele = createGroup(item); break;
            default: iele = createButton(item); break;
          }
          element.append(iele);
          if (type !== 'line' && (_arr[index+1] && _arr[index+1].type !== 'line')) {
            element.append('&nbsp;')
          }
          if(item.active) { _statuCheck.push(item); }
        });

        // 注册表格选中的回调
        handsontableService.addAfterSelectionEnd(function(r, c, r2, c2) {
          var _table = handsontableService.trtb();
          var cyary = _statuCheck.concat();

          // 命中的图标激活状态
          handsontableService.getAreaCood(r, c, r2, c2, function(r, c) {
            if (_table.special[r] && _table.special[r][c]) {
              for (var i = 0, ilen = cyary.length; i < ilen; i++) {
                var checkFn = cyary[i].active;
                if ( checkFn(_table.special[r][c]) ) {
                  cyary[i]._o.addClass('hover');
                  cyary.splice(i, 1);
                  i = -1, ilen = cyary.length;
                }
              }
              if (!cyary.length) { return false; }
            }
          });

          // 未命中的图标
          for (var i = 0, ilen = cyary.length; i < ilen; i++) {
            cyary[i]._o.removeClass('hover');
          }
        });

        // 切换重置
        scope.$on(_spk.sheetChange, function() {
          angular.forEach(_statuCheck, function(item) {
            item._o.removeClass('hover');
          });
        });
        /***************************创建方法**********************************/

        // 创建图标
        function createIcon(fill) {
          var icon = $('<i>'), name = fill, after = '';

          if (typeof fill === 'object') {
            name = fill.name;
            after = fill.nail;
          }
          icon.addClass('icon').addClass('icon-' + name);
          if (after) { return $('<div>').append(icon).append(after).html(); }
          return icon;
        }

        // 创建分割线
        function createLine() {
          var line = $('<span class="tool-cut">&nbsp;</span>');
          return line;
        }

        // 创建容器
        function createContainer(type, fill, style) {
          var span = $('<span>'), html = fill,
              className = 'icon-container';

          if (type === 'font') {
            className = 'font-container';
          } else { html = createIcon(fill); }

          span.addClass(className).append(html).css(style);
          return span;
        }

        // 传感按钮
        function createButton(item) {
          var span = $('<span class="tool-btn">');
          var fill = item.fill || item.icon;
          var ctype = item.ctype;
          var style = item.style || {};

          if (item.type === 'more') { span.addClass('tool-more'); }
          item._o = span; // 附上

          var container = createContainer(ctype, fill, style);
          if(item.key) { span.attr('data-key', item.key); }
          span.append(container).click(function() {
// 应该由控制器绑定点击的方法
            var sp = $(this), fsp = sp.parent('.tool-group');
            var key = sp.attr('data-key'), fkey = '';
            if (fsp.length) { fkey = fsp.attr('data-key'); }
            if (item.sw === true) { sp.toggleClass('hover'); }

            if (scope.cclickk) { scope.cclickk(key, fkey, sp); }
          });

          return span;
        }

        // 创建按钮组
        function createGroup(item) {
          var div = $('<div class="tool-group">'), childs = item.childs;
          if (item.key) { div.attr('data-key', item.key); }

          angular.forEach(childs, function(child, index) {
            var button = createButton(child);
            div.append(button);
          });
          return div;
        }
      }
    };
  }

  var _arr = [
    {'key':'file', 'icon': 'file'},
    {'key':'refresh', 'icon': 'refresh'},
    {'key':'download', 'icon': 'down'},
    {'type': 'line'},
    {'key':'font', 'type': 'group', childs: [
      {'key':'show', 'ctype':'font', 'fill':'宋体', 'style':{'width':'72px'}},
      {'key':'more', 'type':'more', 'icon':'small-arrow', 'style':{'line-height':'10px'}}
    ]},
    {'type': 'line'},
    {'key':'size', 'type': 'group', childs: [
      {'key':'show', 'type':'more', 'ctype':'font', 'fill':'12' },
      {'key':'more', 'type':'more', 'icon':'small-arrow', 'style':{'line-height':'10px'}}
    ]},
    {'type': 'line'},
    {'key':'bold', 'icon': 'blod', 'sw': true,
      'active': function(status) {
        return !!(status.style && status.style['font-weight'] === 'bold');
      }
    },
    {'key':'italic', 'icon': 'italics', 'sw': true,
      'active': function(status) {
        return !!(status.style && status.style['font-style'] === 'italic');
      }},
    {'key':'through', 'icon': 'strikethrough', 'sw': true,
      'active': function(status) {
        return !!(status.style && status.style['text-decoration'] === 'line-through');
      }
    },
    {'key':'color','type': 'group', childs: [
      {'key':'show','fill': {'name': 'color', 'nail': '<span class="icon-swy"></span>'}},
      {'key':'more','type': 'more', 'icon':'small-arrow', 'style':{'line-height':'10px'}}
    ]},
    {'type': 'line'},
    {'key':'align','type': 'group', childs: [
      {'key':'show','icon': 'left'},
      {'key':'more','type': 'more', 'icon':'small-arrow', 'style':{'line-height':'10px'}}
    ]},
    {'key':'background', 'type': 'group', childs: [
      {'key':'show', 'fill': {'name': 'background', 'nail': '<span class="icon-swy2"></span>'}},
      {'key':'more', 'type': 'more', 'icon':'small-arrow', 'style':{'line-height':'10px'}}
    ]},
    {'type': 'line'},
    {'key':'Line', 'icon': 'broken'},
    {'key':'Bar', 'icon': 'column'},
    {'key':'Pie', 'icon': 'pie'},
    {'key':'Area', 'icon': 'curve'},
    {'type': 'line'},
    {'key':'e', 'icon': 'e', 'sw': true,
      'active': function(status) {
        return !!(status.calc && status.calc.e);
      }},
    {'key':'percent', 'icon': 'percent', 'sw': true},
    {'key':'carry', 'icon': 'carry'},
    {'key':'less', 'icon': 'less'}
  ];

})();