(function() {
  'use strict';

  angular
    .module('platform.directive')
    .directive('handsontable', handsontableDirective);

  handsontableDirective.$inject = ['handsontableService', 'coreCF'];
  function handsontableDirective(handsontableService, config) {
    return {
      replace: true,
      template: '<div style="width:99%;height:99%;overflow:auto;padding-top:10px;">'+
                  '<div id="x" style="font-size:14px;"></div>'
                +'</div>',
      scope: {'table': '='},
      link: function(scope, element, attrs) {
        var _handsontable = null;
        var _spk = config.spreadKey;
        var _container = element.children('#x');

        scope.$watch('table', function(table) {
          if (!table) { return; }
          handsontableService.setTable(table);

          var width = element.width() - 20, height = element.height() - 20;
          var settings = angular.extend({
            width: width,
            height: height
          }, handsontableService.settings());

console.info(table);
          // 变更就重新生成
          if (_handsontable) { _handsontable.destroy(); }
          _handsontable = new Handsontable(_container[0], settings);
        });

        function resizeTB() {
          // console.info('RS');
          // var width = element.width(), height = element.height();
          // _handsontable.updateSettings({
          //   width: width,
          //   height: height
          // });
        }

        // 监听容器变更
        scope.$on(_spk.containerSizeChange, function(){
          setTimeout(function(){
            resizeTB();
          }, 301);
        });
        //$(window).resize(function() { resizeTB(); });

      }
    };
  }

})();