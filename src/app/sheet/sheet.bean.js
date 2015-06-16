(function() {
  'use strict';

  angular
    .module('platform.sheet')
    .factory('sheetBean', sheetBean)

  sheetBean.$inject = ['conditionBean', 'tableBean'];
  function sheetBean(conditionBean, tableBean) {
    var service = {
      'parse': parse
    };
    return service;

    function Sheet(id, name, table, condition) {
      this.id = id;
      this.name = name;
      this.table = table;
      this.condition = condition;
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
      var condition = conditionBean.parse(source.accordionVO);

      return new Sheet(id, name, table, condition);
    }
  }

})();
