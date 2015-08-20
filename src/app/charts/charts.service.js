(function() {
  'use strict';

  angular
    .module('pf.charts')
    .factory('chartService', chartService);

  chartService.$inject = ['$rootScope', 'dataService', 'sheetService', 'coreCF'];
  function chartService($rootScope, dataService, sheetService, config) {
    var _spk = config.spreadKey;
    var _chartCache = {}; // 图表缓存
    var service = {
      'getCharts': getCharts,
      'getAreaCharts': getChartsData,
      'getChartById': function(id){ return _chartCache[id]; }
    };
    return service;

    /**
     * 获取所有数据的图表
     * @param  {String} type 图表类型
     * @return {Promise}      [description]
     */
    function getCharts(type) {
      return getChartsData(null, null, type);
    }

    /**
     * 获取图表数据, 根据一个区域和图表类型
     * @param  {Array} p1 [r, c]
     * @param  {Array} p2 [r, c]
     * @param  {String} type 图表类型
     * @return {Promise} 
     */
    function getChartsData(p1, p2, type) {
      var sheetId = sheetService.getSheetId();
      var params = {
        'chartsType': type,
        'sheetId': sheetId
      };
      if (p1 && p2) {
        params.p1 = p1[0] + ',' + p1[1];
        params.p2 = p2[0] + ',' + p2[1];
      }

      return dataService.get('charts', params).then(function(source) {
        var chart = {'type': type, 'data': source};
        var sheetId = sheetService.getSheetId();
        _chartCache[sheetId] = chart; // 缓存上

        $rootScope.$broadcast(_spk.chartsChange, chart);
        return source;
      });
    }
  }

})();