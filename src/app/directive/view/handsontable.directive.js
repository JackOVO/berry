(function() {
  'use strict';

  angular
    .module('pf.directive')
    .directive('handsontable', handsontableDirective);

  handsontableDirective.$inject = ['handsontableService', 'coreCF'];
  function handsontableDirective(handsontableService, config) {
    return {
      replace: true,
      template: '<div></div>',
      scope: {'data': '='},
      link: function(scope, element, attrs) {
        var _handsontable = null;
        var _spk = config.spreadKey;
        var _father = element.parent();
console.info(_father);

          scope.$watch('data', function(data) {
            if (!data) { return; }
            var width = _father.width(), height = _father.height();
console.info('_____________', width, height);

            var settings = angular.extend({
              // stretchH: 'all',
              width: width,
              height: height
            }, handsontableService.settings(data));

            // 变更就重新生成
            if (_handsontable) { _handsontable.destroy(); }
            _handsontable = new Handsontable(element[0], settings);
            handsontableService.setHandsontable(_handsontable);
          });

        // 调整大小他妈的
        function resizeTB() {
          var width = _father.innerWidth(), height = _father.height();
        console.info(_father, width);
          _handsontable.updateSettings({
            width: width - 20, height: height
          });
          _handsontable.render();
        }

        // 监听容器变更
        scope.$on(_spk.containerSizeChange, function(){
          window.setTimeout(function(){
            resizeTB();
          }, 450);
        });

        // 监听窗口
        $(window).resize(function() { resizeTB(); });
      }
    };
  }

})();
