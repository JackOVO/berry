(function() {
  'use strict';

  angular
    .module('platform.sheet')
    .factory('sheetBean', sheetBean);

  sheetBean.$inject = ['tableBean'];
  function sheetBean(tableBean) {
    var service = {
      'parse': parse
    };

    return service;

    function Sheet(id, name, table, dimension) {
      this.id = id;
      this.name = name;
      this.table = table;
      this.dimension = dimension;
    }

    /**
     * 由后台源解析成前台实体
     * @param  {Object} source 后台源数据
     * @return {Object} 解析后的实体
     */
    function parse(source) {
      var sheetInfo = source.sheetInfo;
      var id = sheetInfo.sheetId;
      var name = sheetInfo.sheetName;
      var freqId = sheetInfo.freqId;
      var cubeId = sheetInfo.cubeId;

      var table = tableBean.parse(source.tableVO);

      return new Sheet(id, name, table);
    }
  }
})();