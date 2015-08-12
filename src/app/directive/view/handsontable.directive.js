(function() {
  'use strict';

  angular
    .module('pf.directive')
    .directive('handsontable', handsontableDirective);

  handsontableDirective.$inject = ['handsontableService', 'coreCF'];
  function handsontableDirective(handsontableService, config) {
    return {
      replace: true,
      template: '<div style="width:99%;height:99%;'+
                    'overflow:auto;'+
                    'padding-top:10px;'+
                    '">'+
                  '<div id="handsontable" style="font-size:14px;"></div>'
                +'</div>',
      scope: {'data': '='},
      link: function(scope, element, attrs) {
        var _handsontable = null;
        var _spk = config.spreadKey;
        var _container = element.children('#handsontable');

        scope.$watch('data', function(data) {
          if (!data) { return; }

          var width = element.width() - 20, height = element.height() - 20;
          var settings = angular.extend({
            //stretchH: 'all',
            width: width,
            height: height
          }, handsontableService.settings(data));

          // 变更就重新生成
          if (_handsontable) { _handsontable.destroy(); }
          _handsontable = new Handsontable(_container[0], settings);
          handsontableService.setHandsontable(_handsontable);
        });

        // 调整大小他妈的
        function resizeTB() {
          var width = element.width(), height = element.height();
          _handsontable.updateSettings({
            width: width - 20,
            height: height - 20
          });
        }

        // 监听容器变更
        scope.$on(_spk.containerSizeChange, function(){
          window.setTimeout(function(){
            resizeTB();
            _handsontable.render();
          }, 400);
        });

        // 监听窗口
        $(window).resize(function() { resizeTB(); });
      }
    };
  }

})();
