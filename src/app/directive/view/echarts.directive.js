(function() {
  'use strict';
  // 图表指令

  angular
    .module('pf.directive')
    .directive('echarts', echartsDirective);

  echartsDirective.$inject = ['coreCF'];
  function echartsDirective(config) {
    return {
      replace: true,
      scope: {'chart': '=' },
      template: '<div style="height:100%;"></div>',
      link: function(scope, element, attrs) {
        var _spk = config.spreadKey;
        var _fileMap = {
          'pie': ['pie', 'ring'],
          'radar': ['radar', 'fillradar'],
          'line': ['line', 'stackline', 'area', 'stackarea'],
          'bar': ['bar', 'stackbar', 'rotatebar', 'stackrotatebar']
        };
        var _myChart = null;

        require.config({
          paths: { echarts: 'http://echarts.baidu.com/build/dist' }
        });

        scope.$watch('chart', function(chart) {
          if (!chart) { return; }

          var menuKey = chart.type.toLowerCase();

          var rtype = 'echarts/chart/' + getFileName(menuKey);
          require(['echarts', rtype], function(ec) {
            _myChart = ec.init(element[0]);
            _myChart.setOption(chart.data);
            window.onresize = _myChart.resize;
          });
        });

        scope.$on(_spk.containerSizeChange, function(e, timeout){
          window.setTimeout(function(){
            if(_myChart) { _myChart.resize(); }
          }, timeout || 1);
        });

        // 根据映射获取文件名
        function getFileName(menuKey) {
          for (var key in _fileMap) {
            var fileAry = _fileMap[key];
            if (fileAry.indexOf(menuKey) !== -1) {
              return key;
            }
          }
          return menuKey;
        }
      }
    }
  }

})();