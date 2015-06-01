(function() {
  'use strict';

  angular
    .module('platform.table')
    .factory('tableBean', tableBean);

  tableBean.$inject = ['$q'];
  function tableBean($q) {
    var service = {
      'parse': parse
    };
    return service;

    function Table(data, fxcl, fxrt, mergeCells) {
      this.data = data;

      this.fixedColumnsLeft = fxcl;
      this.fixedRowsTop = fxrt;
      this.mergeCells = mergeCells;
    }

     /**
     * 由后台源解析成前台实体
     * @param  {Object} source 后台源数据
     * @return {Object} 解析后的实体
     */
    function parse (source) {
      var data = [];
      var merges = [];
      var values = source.values;
      var fixedRowsTop = source.fixedRowsTop;
      var fixedColumnsLeft = source.fixedColumnsLeft;

      var extract = extractValues(values);
      data = extract.data;
      merges = extract.merges;
      return new Table(data, fixedRowsTop, fixedColumnsLeft, merges);
    }

    // 表格值格式化
    function cellFormat(cell) {
      return cell.value || 'Orz';
    }
    // 提取生成合并值
    function cellMerge(r, c, cell) {
      if (cell.colspan || cell.rowspan) {
        return {
          row: r, col: c,
          colspan: cell.colspan + 1,
          rowspan: cell.rowspan + 1
        };
      }
    }

    /**
     * 从表格值中提取所需要的数据
     * @param  {Array} values 源表格值
     * @return {Object} ()
     */
    function extractValues (values) {
      var result = {
        'data': [],
        'merges': []
      };

      var row = [];
      traverseTwoDimeArray(
        values,
        function(r, rdata) { row = []; },
        function(r, c, cell) {
          var value = cellFormat(cell);
          var merge = cellMerge(r, c, cell);

          row.push(value);
          if(merge) { result.mergeCells.push(merge); }
        },
        function(r, rdata) { result.data.push(row); });
      return result;
    }

    /**
     * 遍历二维数组, 读每行及每列时执行回调
     * @param  {Array} twoArray 二维数组
     * @param  {Function} rowProcess 读行的回调(行号, 行数据)
     * @param  {Function} colProcess 读列的回调(列号, 列数据)
     * @param  {Function} rowAfterProcess 改行读完后(列号, 列数据)
     */
    function traverseTwoDimeArray (twoArray, rowProcess, colProcess, rowAfterProcess) {
      for (var r = 0, rlen = twoArray.length; r < rlen; r++) {
        var rowData = twoArray[r];
        if (rowProcess) { rowProcess(r, rowData); }
        for (var c = 0, clen = rowData.length; c < clen; c++) {
          var cellData = rowData[c];
          if (colProcess) { colProcess(r, c, cellData); }
        }
        if (rowAfterProcess) { rowAfterProcess(r, rowData); }
      }
    }

  }
})();