(function() {
  'user strict';
  angular
    .module('pf.directive')
    .directive('coolmenu', coolMenuDirective);

  function coolMenuDirective () {
    return {
      scope: {'data': '=', callback: '&'},
      templateUrl: 'app/template/coolmenu.html',
      link: function(scope, element, attrs) {
        var _power = false; // 悬浮开关
        var root = element.children('.menu').empty();
        var _callback = scope.callback();

        // 监听从新创建绑定
        scope.$watch('data', function(data) {
          if (!data) { return; };
          root = element.children('.menu').empty();
          _power = false; // 悬浮开关

          // 迭代添加元素
          traversal(data, root, function(item, quote) {
            var li = createItem(item.key, item.text);
            if (item.type === 'line') {
              quote.append('<li class="group-line"></li>');
            } else { quote.append(li); }
            if (item.childs) { return $('<ul>').appendTo(li.addClass('child')); }
              else { return li; }
          });

          // 清空
          root.children('li').removeClass('child').click(function(e) {
            _power = true; $(this).mouseover();
          });
        });

        $(window).click(function(){
          _power = false;
          root.find('.hover').removeClass('hover');
        });

        // 遍历
        function traversal(array, father, callback) {
          for (var i = 0, ilen = array.length; i < ilen; i++) {
            var item = array[i];
            var quote = callback(item, father);
            if (item.childs) { traversal(item.childs, quote, callback); }
          }
        }

        // 创建基本项
        function createItem(key, text) {
          var li = $('<li>').attr('data-key', key);
          li.append('<a href="javascript:;">'+ text +'</a>');
          li.click(clickFn);
          li.mouseover(hoverFn);
          return li;
        }

        // 激活方法
        function hoverFn() {
          if (_power === false) { return; }
          $(this).addClass('hover').siblings().removeClass('hover');
        }

        // 点击方法
        function clickFn(e) {
          _power = false; var li = $(this);
          var key = li.attr('data-key'), keys = [];
          li.parents('.hover').each(function(){
            keys.push($(this).removeClass('hover').attr('data-key'));
          });
          _callback(key, keys);
          e.stopPropagation();
        }
      }
    };
  }

})();