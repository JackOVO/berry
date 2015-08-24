(function() {
  'use strict';
  angular
    .module('pf.directive')
    .directive('toolbar', toolbarDirective);

    var arr = [
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
      {'key':'blod', 'icon': 'blod'},
      {'key':'italics', 'icon': 'italics'},
      {'key':'strikethrough', 'icon': 'strikethrough'},
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
      {'key':'e', 'icon': 'e'},
      {'key':'percent', 'icon': 'percent'},
      {'key':'carry', 'icon': 'carry'},
      {'key':'less', 'icon': 'less'},
      {'key':'format', 'type': 'group', childs: [
        {'key':'show', 'icon': 'format'},
        {'key':'more', 'type': 'more', 'icon':'small-arrow', 'style':{'line-height':'10px'}}
      ]}
    ];

  toolbarDirective.$inject = ['toolbarService'];
  function toolbarDirective (toolbarService) {
    return {
      replace: true,
      templateUrl: 'app/template/toolbar.html',
      link: function(scope, element, attrs, ctrl) {

        // 开始创建
        angular.forEach(arr, function(item, index) {
          var type = item.type, iele = null;
          switch(type) {
            case 'line': iele = createLine(); break;
            case 'group': iele = createGroup(item); break;
            default: iele = createButton(item); break;
          }
          element.append(iele);
        });

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

          var container = createContainer(ctype, fill, style);
          if(item.key) { span.attr('data-key', item.key); }
          span.append(container).click(function() {
            var sp = $(this), fsp = sp.parent('.tool-group');
            var key = sp.attr('data-key'), fkey = '';
            if (fsp.length) { fkey = fsp.attr('data-key'); }

// 转移执行, 回调什么的后续处理???
toolbarService.inform(key, fkey);
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


})();