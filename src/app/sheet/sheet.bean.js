(function() {
  'use strict';

  angular
    .module('platform.sheet')
    .factory('Sheet', SheetBean);

  function SheetBean () {
    var service = {
      'parse': parse
    };

    return service;

    function Sheet(id, name) {
      this.id = id;
      this.name = name;
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
console.info(new Sheet(id, name));
      return new Sheet(id, name);
    }
  }
})();