(function() {
  'use strict';

  angular
    .module('platform.workbook')
    .factory('workBookBean', workBookBean);

  workBookBean.$inject = ['sheetBean'];
  function workBookBean (sheetBean) {
    var service = {
      'parse': parse
    };

    WorkBook.prototype.toString = toString;
    return service;

    function WorkBook(index, sheets) {
      this.index = index; // 选中的下标
      this.sheets = sheets; // 存放工作表
    }

    /**
     * 由后台源解析成前台实体
     * @param  {Object} source 后台源数据
     * @return {Object} 解析后的实体
     */
    function parse(source) {
      var index = null;
      var sheets = [];

      for(var i = 0, ilen = source.length; i < ilen; i++) {
        var sheet = sheetBean.parse(source[i]);
        sheets.push(sheet);
        if (index === null) { index = 0; }
      }
      return new WorkBook(index, sheets);
    }

    /**
     * 拼接工作簿属性
     * @return {String} 拼接结果
     */
    function toString () {
      /*jshint validthis:true */
      var content = '';
      content += '共有' + this.sheets.length + '个工作簿';
      content += '当前选中下标为' + this.index;
      return content + '.';
    }

  }

})();