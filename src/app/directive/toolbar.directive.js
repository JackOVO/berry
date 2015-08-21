(function() {
  'use strict';
  angular
    .module('pf.directive')
    .directive('toolbar', toolbarDirective);

  function toolbarDirective () {
    return {
      replace: true,
      templateUrl: 'app/template/toolbar.html',
      link: function(scope, element, attrs, ctrl) {
      //   angular.forEach(toolbar, function(item, index) {
      //     console.info(item, element);
      //     var filling = null;
      //     switch(item.type) {
      //       case 'line':
      //         filling = $('<span class="tool-cut">&nbsp;</span>');
      //         break;
      //       case 'group':
      //         filling = createBtnGroup(item);
      //         break;
      //       default:
      //         filling = createButton(item.name);
      //       break;
      //     }
      //     element.append(filling);
      //   });

      //   // 创建包装好的按钮, name为图标的名字
      //   function createButton(name, ctype) {
      //     var btn = $('<span class="tool-btn"></span>');
      //     if (ctype === 'font') {
      //       var cont = $('<span class="font-container"></span>').html(name);
      //     } else {
      //       var cont = $('<span class="icon-container"></span>').appendTo(btn);
      //       var icon = $('<i class="icon icon-'+ name +'"></i>').appendTo(cont);
      //     }
      //     return btn;
      //   }

      //   // 创建一个按钮组
      //   function createBtnGroup(item) {
      //     var group = $('<div class="tool-group"></div>');
      //     angular.forEach(item.child, function(cd, index) {

      //     });
      //     return group;
      //   }

        // angular.forEach(toolbar, function(item, index) {
        //   var type = item.type || 'btn';
        //   if (type === 'btn') {
        //     var btn = createBtn(item.name);
        //   }
        //   element.append();
        // });

        // // 创建按钮
        // function createBtn(name) {
        //   var span = $('<span class="tool-btn"></span>');
        //   var container = $('<span class="icon-container"></span>');
        //   var icon = $('<i class="icon icon-"'+ name +'></i>');
        //   container.appendTo(icon);

        //   return span.append(container);
      }
    };
  }

  // var toolbar = [
  //   {'name': 'file'},
  //   {'name': 'refresh'},
  //   {'name': 'down'},
  //   {'type': 'line'},
  //   {'type': 'group', child: [
  //     {'ctype': 'font', 'width': '72', 'text': '宋体'}
  //   ]}
  // ];
})();