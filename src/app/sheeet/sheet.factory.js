(function() {
  'use strict';

  angular
    .module('pf.sheet')
    .factory('sheetFactory', sheetFactory);

  function sheetFactory() {
    var service = {
      'parse': parse
    };
    return service;

    /**
     * 工作表类
     * @param {String} id        后台id
     * @param {String} name      表名, 后台定义
     * @param {Table} table      表格对象, handsontable封装
     * @param {Condition} condition 维度容器对象
     */
    function Sheet(id, name, table, condition) {
      this.id = id;
      this.name = name;
      this.table = table;
      this.condition = condition;
    }

    /**
     * 解析源数据, 创建表对象
     * @param  {Object} source 后台源
     * @return {Sheet} 工作表
     */
    function parse(source) {
      var sheetInfo = source.sheetInfo;
      var id = sheetInfo.sheetId;
      var name = sheetInfo.sheetName;
      //var freqId = sheetInfo.freqId;
      //var cubeId = sheetInfo.cubeId;

      // var table = tableFactory.parse(sheetSource.tableVO);
      // var condition = conditionFactory.parse(sheetSource.accordionVO);
      return new Sheet(id, name, null, null);
    }

  }

})();