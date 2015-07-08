(function() {
  'use strict';

  angular
    .module('platform.workbook')
    .factory('workBookFactory', workBookFactory);

  workBookFactory.$inject = ['sheetFactory'];
  function workBookFactory(sheetFactory) {
    var service = {
      'parse': parse
    };
    WorkBook.prototype.merger = merger;
    WorkBook.prototype.addSheet = addSheet;
    WorkBook.prototype.selectSheet = selectSheet;
    WorkBook.prototype.removeSheet = removeSheet;
    WorkBook.prototype.getSheetById = getSheetById;
    return service;

    // 工作簿对象
    function WorkBook(index, sheets) {
      this.selectedIndex = index;
      this.sheets = sheets;
    }

    /**
     * 根据id返回一个表
     * @param {String} id
     * @return {Number} 下标
     */
    function getSheetById(id) {
      var sheets = this.sheets;
      for (var i = 0, ilen = sheets.length; i < ilen; i++) {
        var sheet = sheets[i];
        if (sheet.id === id) { return i; }
      }
      return false;
    }

    /**
     * 添加一个表, 并返回最后一个表的下标
     * @param {Sheet} sheet 工作表, 会做类型判断
     */
    function addSheet(sheet) {
      /*jshint validthis:true */
      // sheet instanceof Sheet
      if (sheet.id) { this.sheets.push(sheet); }
       else { console.error('不是一个工作表!', sheet); }
      return this.sheets.length - 1;
    }

    /**
     * 选中一张表, 错误提示
     * @param  {number} index 表下标
     * @return {Sheet|null} 选中的表返回
     */
    function selectSheet(index) {
      /*jshint validthis:true */
      var selectedSheet = this.sheets[index];
      if (selectedSheet) {
        this.selectedIndex = index;
      } else {
        console.error('不存在的表:', index);
      }
      return selectedSheet;
    }

    /**
     * 删除一个表根据表下标, 返回删除项
     * @param  {Number} index 表下标
     * @return {Object} 删除项
     */
    function removeSheet(index) {
      /*jshint validthis:true */
      return this.sheets.splice(index, 1);
    }

    /**
     * 合并工作簿, 根据表id判断
     * @param  {WorkBook} workBook 合并工作簿
     * @return {Number} 添加的下标或选中的下标
     */
    function merger(workBook) {
      var twb = this, selectIndex = this.selectedIndex;
      var sheets = workBook.sheets;
      angular.forEach(sheets, function(sheet, index) {
        var tIndex = twb.getSheetById(sheet.id);
        if (tIndex !== false) { // 找到了覆盖
console.log(sheet);
          twb.sheets[tIndex] = sheet;
        } else { selectIndex = twb.addSheet(sheet); }
      });
      return selectIndex;
    }

    /**
     * 解析成工作簿对象
     * @param  {Array} workBookSource 后台源
     * @return {WorkBook}
     */
    function parse(workBookSource) {
      var selectedIndex = null;
      var sheets = [];

      angular.forEach(workBookSource, function(sheetSource, index) {
        var sheet = sheetFactory.parse(sheetSource);
        sheets.push(sheet);
        // 默认选中
        // if (selectedIndex === null) { selectedIndex = 0; }
      });
      return new WorkBook(selectedIndex, sheets);
    }
  }

})();