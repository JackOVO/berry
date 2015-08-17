(function() {
  'use strict';

  angular
    .module('pf.directive')
    .directive('handsontable', handsontableDirective);

  handsontableDirective.$inject = ['handsontableService', 'coreCF'];
  function handsontableDirective(handsontableService, config) {
    return {
      replace: true,
      template: '<div style="width:100%;height:100%;font-size:14px;"></div>',
      scope: {'data': '='},
      link: function(scope, element, attrs) {
//console.info(element);
        var _spk = config.spreadKey;
        var _handsontable = null;

        scope.$watch('data', function(data) {
          if (!data) { return; }

          var width = element.width(), height = element.height();
console.info(element, width, height);
          var settings = angular.extend({
            // stretchH: 'all',
            width: width,
            height: height
          }, handsontableService.settings(data));

          // 变更就重新生成
          if (_handsontable) { _handsontable.destroy(); }
          _handsontable = new Handsontable(element[0], settings);
          handsontableService.setHandsontable(_handsontable);

          // setInterval(function() {
          //   console.info(height);
          //   _handsontable.updateSettings({
          //     height: (height -= 1)
          //   });
          // }, 100);
        });



// var _spk = config.spreadKey;
// var _container = element.children('#handsontable');

// scope.$watch('data', function(data) {
//   if (!data) { return; }

//   var width = element.width() - 20, height = element.height() - 20;
//   var settings = angular.extend({
//     //stretchH: 'all',
//     width: width,
//     height: height
//   }, handsontableService.settings(data));

//   // 变更就重新生成
//   if (_handsontable) { _handsontable.destroy(); }
//   _handsontable = new Handsontable(_container[0], settings);
//   handsontableService.setHandsontable(_handsontable);
// });

// 调整大小他妈的
function resizeTB() {
  var width = element.width(), height = element.height();
  _handsontable.updateSettings({
    width: width, height: height
  });
   _handsontable.render();
}

// 监听容器变更
scope.$on(_spk.containerSizeChange, function(){
  window.setTimeout(function(){
    resizeTB();
  }, 400);
});

// // 监听窗口
// $(window).resize(function() { resizeTB(); });
      }
    };
  }

})();
