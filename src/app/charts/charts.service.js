(function() {
  'use strict';

  angular
    .module('pf.charts')
    .factory('chartService', chartService);

  chartService.$inject = ['dataService', 'sheetService'];
  function chartService(dataService, sheetService) {
    var service = {
      'getCharts': getChartsData
    };
    return service;

    /**
     * 获取图表数据, 根据一个区域和图表类型
     * @param  {Array} p1 [r, c]
     * @param  {Array} p2 [r, c]
     * @param  {String} type 图表类型
     * @return {} 
     */
    function getChartsData(p1, p2, type) {
      var sheetId = sheetService.getSheetId();
      var params = {
        'hartsType': type,
        'sheetId': sheetId,
        'p1': p1[0] + ',' + p1[1],
        'p2': p2[0] + ',' + p2[1]
      };

      return dataService.get('charts', params, function(source) {
        return source;
      });
    }
  }

})();