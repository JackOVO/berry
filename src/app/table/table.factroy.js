(function() {
  'use strict';
  // 表格类工厂, 主要提供解析创建表格对象, handsontable映射.

  angular
    .module('pf.table')
    .factory('tableFactory', tableFactory);

  function tableFactory() {
    var service = {
      'parse': parse
    };
    return service;

    /**
     * 表格类, handsontable配置映射
     * @param {Array} data 二维数组
     * @param {Array} special 特殊坐标的配置
     * @param {Array} mergeCells 合并单元格描述
     * @param {Number} fixedRowsTop 冻结行
     * @param {Number} fixedColumnsLeft 冻结列
     */
    function Table(data, special, mergeCells, fixedRowsTop, fixedColumnsLeft) {
      this.data = data;
      this.special = special;
      this.mergeCells = mergeCells;
      this.fixedRowsTop = fixedRowsTop;
      this.fixedColumnsLeft = fixedColumnsLeft;
    }

    /**
     * 解析成表格对象
     * @param  {Object} tableSouce 源数据
     * @return {Table}
     */
    function parse(tableSouce) {
      var data = [], merges = [];
      var values = tableSouce.values;
      var special = tableSouce.infoIconPosLst;
      var fixedRowsTop = tableSouce.fixedRowsTop;
      var fixedColumnsLeft = tableSouce.fixedColumnsLeft;

      var kbo = extract(values);
      data = kbo.data;
      merges = kbo.merges;
      special = extractSpecial(special);
      return new Table(data, special, merges, fixedRowsTop, fixedColumnsLeft);
    }

    // 表格值格式化
    function cellFormat(cell) {
      return cell.value || '';
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
    function extract(values) {
      var result = { 'data': [], 'merges': [] };

      var row = [];
      traverseTwoDimeArray(
        values,
        function(r, rdata) { row = []; },
        function(r, c, cell) {
          if (cell === null) { cell = {}; } // 啊啊啊啊啊啊啊啊啊
          var value = cellFormat(cell);
          var merge = cellMerge(r, c, cell);

          row.push(value);
          if(merge) { result.merges.push(merge); }
        },
        function(r, rdata) { result.data.push(row); });
      return result;
    }

    /**
     * 提取特殊的单元格属性
     * @param  {xia} source 
     * @return {rnum:{cnum:{}}}
     */
    function extractSpecial(source) {
      var special = {};
      angular.forEach(source, function(sok, index) {
        if (!special[sok.x]) { special[sok.x] = {} };
        if (!special[sok.x][sok.y]) { special[sok.x][sok.y] = {}; }
        var cols = special[sok.x][sok.y];

        cols.code = sok.code;
        cols.type = sok.type;
      });
      return special;
    }

    /**
     * 遍历二维数组, 读每行及每列时执行回调
     * @param  {Array} twoArray 二维数组
     * @param  {Function} rowProcess 读行的回调(行号, 行数据)
     * @param  {Function} colProcess 读列的回调(列号, 列数据)
     * @param  {Function} rowAfterProcess 改行读完后(列号, 列数据)
     */
    function traverseTwoDimeArray(twoArray, rowProcess, colProcess, rowAfterProcess) {
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