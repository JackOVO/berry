(function() {
  'use strict';

  angular
    .module('pf.directive')
    .directive('handsontable', handsontableDirective);

  handsontableDirective.$inject = ['handsontableService', 'coreCF'];
  function handsontableDirective(handsontableService, config) {
    return {
      replace: true,
      template: '<div style="height:100%;"></div>',
      scope: {'data': '='},
      link: function(scope, element, attrs) {
        var _handsontable = null;
        var _spk = config.spreadKey;
        var _father = element.parent();

          scope.$watch('data', function(data) {
            if (!data) { return; }
            var width = _father.innerWidth(), height = _father.height();

            var settings = angular.extend({
              //stretchH: 'all',
              width: width - 20,
              height: height - 10
            }, handsontableService.settings(data));

            // 变更就重新生成
            if (_handsontable) { _handsontable.destroy(); }
            _handsontable = new Handsontable(element[0], settings);
            handsontableService.setHandsontable(_handsontable);
          });

        // 调整大小他妈的
        function resizeHandsontable() {
          var width = _father.innerWidth(), height = _father.height();
          element.width(width - 20).height(height - 10);
          _handsontable.render();
        }

        // 监听容器变更
        scope.$on(_spk.containerSizeChange, function(e, timeout){
          window.setTimeout(function(){
            resizeHandsontable();
          }, timeout || 1);
        });

        // 监听窗口
        $(window).resize(function() { resizeHandsontable(); });
      }
    };
  }

})();
