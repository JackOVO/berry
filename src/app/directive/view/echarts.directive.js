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
      template: '<div style="width:100%;height:100%;"></div>',
      link: function(scope, element, attrs) {
        require.config({
          paths: {
            echarts: 'http://echarts.baidu.com/build/dist'
          }
        });

        // require(['echarts', 'echarts/chart/bar'], function(ec) {
        //   var _spk = config.spreadKey;
        //   var myChart = ec.init(element[0]);

        //   var option = {
        //             tooltip: {
        //                 show: true
        //             },
        //             legend: {
        //                 data:['销量']
        //             },
        //             xAxis : [
        //                 {
        //                     type : 'category',
        //                     data : ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        //                 }
        //             ],
        //             yAxis : [
        //                 {
        //                     type : 'value'
        //                 }
        //             ],
        //             series : [
        //                 {
        //                     "name":"销量",
        //                     "type":"bar",
        //                     "data":[5, 20, 40, 10, 10, 20]
        //                 }
        //             ]
        //         };
        
        //         // 为echarts对象加载数据 
        //         myChart.setOption(option);

        //         scope.$on(_spk.containerSizeChange, function(e, timeout){
        //   window.setTimeout(function(){
        //     myChart.resize();
        //   }, timeout||1);
        // });
        //         window.onresize = myChart.resize;
                
        // });
      }
    }
  }

})();