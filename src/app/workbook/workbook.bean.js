(function() {
  'use strict';

  angular
    .module('platform.workbook')
    .factory('workBookBean', workBookBean);

  workBookBean.$inject = ['sheetBean'];
  function workBookBean(sheetBean) {
    var service = {
      'parse': parse
    };
    WorkBook.prototype.toString = toString;
    WorkBook.prototype.selected = selected;
    WorkBook.prototype.concatSheet = concatSheet;
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
     * 选择一个表并返回
     * @param  {Number} index sheets中的下标
     * @return {Sheet} 选中的表
     */
    function selected(index) {
      /*jshint validthis:true */
      var length = this.sheets.length;
      if (index < 0 || index > length) {
        return console.error('错误的下标:' + index);
      }
      this.index = index;
      return this.sheets[this.index];
    }

    /**
     * 合并两个工作簿里的表, 根据sheetId作为唯一判断
     * 如果原工作簿中不存在该表, 就新增一个
     * @param  {WorkBook} workBook 覆盖的工作簿
     * @return {Number} 返回最后一个变更表的index
     */
    function concatSheet(workBook) {
      var selIndex = 0;
      var ts = this.sheets; // 当前表
      var cs = workBook.sheets; // 覆盖表

      angular.forEach(cs, function(sheet, index) {
        var isExist = sheetExist(sheet, ts);
        if (isExist !== false) { // 已存在的表
          sheet.condition.sequence.push('a');
          ts[isExist] = sheet; // 替换
          selIndex = isExist;
        } else {
          ts.push(sheet);
          selIndex = ts.length - 1;
        }
      });

      function sheetExist(sheet, array) {
        for (var i = 0, ilen = array.length; i < ilen; i++) {
          if (array[i].id === sheet.id) { return i; }// 已存在
        }
        return false;
      }
      return selIndex;
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
