(function() {
  'use strict';

  angular
    .module('platform.sheet')
    .factory('sheetFactory', sheetFactory);

  sheetFactory.$inject = ['tableFactory', 'conditionFactory'];
  function sheetFactory(tableFactory, conditionFactory) {
    var service = {
      'parse': parse
    };
    return service;

    // 工作表
    function Sheet(id, name, table, condition) {
      this.id = id;
      this.name = name;
      this.table = table;
      this.condition = condition;
    }

    /**
     * 解析成工作表对象
     * @param  {Object} sheetSource 源数据
     * @return {Sheet}
     */
    function parse(sheetSource) {
      var sheetInfo = sheetSource.sheetInfo;
      var id = sheetInfo.sheetId;
      var name = sheetInfo.sheetName;
      //var freqId = sheetInfo.freqId;
      //var cubeId = sheetInfo.cubeId;

      var table = tableFactory.parse(sheetSource.tableVO);
      var condition = conditionFactory.parse(sheetSource.accordionVO);
      return new Sheet(id, name, table, condition);
    }
  }

})();