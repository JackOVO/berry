(function() {
  'use strict';
  // 表格服务控制

  angular
    .module('pf.table')
    .factory('tableService', tableService);

  tableService.$inject = ['tableFactory'];
  function tableService(tableFactory) {
    var service = {
      'sieveCoord': sieveCoord
    };
    return service;

    /**
     * 筛选出新增的坐标, 后台返回的是些啥, 我不愿匹配了, 乱七八糟.
     * @param  {Array} sample 样本
     * @param  {Array} stone 对比
     * @return {Array} 增加位置的坐标
     */
    function sieveCoord(sample, stone) {
      var result = [];
      for (var i = 0, ilen = stone.length; i < ilen; i++) {
        var row = stone[i], diff = sieveRow(sample[0]||[], row);
        if (diff.length <= 1) {
          sample.splice(0, 1);
        } else {
          diff = new Array(row.length);
        }
        for (var c = 0, clen = diff.length; c < clen; c++) {
          result.push([i, diff[c]||c]);
        }
      }
      function sieveRow(ra, rb) {
        var yary = [];
        for (var i = 0, ilen = rb.length; i < ilen; i++) {
          if (ra[i] !== rb[i]) { yary.push(i); }
        }
        return yary;
      }
      return result;
    }
  }

})();