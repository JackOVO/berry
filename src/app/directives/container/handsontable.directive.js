(function() {
  'use strict';

  angular
    .module('platform.directive')
    .directive('handsontable', handsontableDirective);

  handsontableDirective.$inject = ['handsontableService'];
  function handsontableDirective(handsontableService) {
    return {
      replace: true,
      template: '<div style="width:100%;height:100%;padding-top:10px;">'+
                  '<div id="x" style="font-size:14px;"></div>'
                +'</div>',
      scope: {'table': '='},
      link: function(scope, element, attrs) {
        var _handsontable = null;
        var _container = element.children('#x');

        scope.$watch('table', function(table) {
          if (!table) { return; }
          handsontableService.setTable(table);

          var width = element.width(), height = element.height();
          var settings = angular.extend({
            width: width,
            height: height
          }, handsontableService.settings());

console.info(table);
          // 变更就重新生成
          if (_handsontable) { _handsontable.destroy(); }
          _handsontable = new Handsontable(_container[0], settings);
        });

        $(window).resize(function() {
          var width = element.width(), height = element.height();
          _handsontable.updateSettings({
            width: width,
            height: height,
//             colWidths: function(col){
// console.info(col);
//               return 100;
//             }
          });
        });
      }
    };
  }

})();