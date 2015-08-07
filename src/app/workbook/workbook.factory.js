(function() {
  'use strict';

  angular
    .module('pf.workbook')
    .factory('workbookFactory', workbookFactory);

  workbookFactory.$inject = ['dataService', 'gundamFactory', 'sheetFactory'];
  function workbookFactory(dataService, gundamFactory, sheetFactory) {
    var service = {
      'rqWorkBook': rqWorkBook
    };
    WorkBook.prototype.merger = merger;
    WorkBook.prototype.remove = remove;
    WorkBook.prototype.selected = selected;
    WorkBook.prototype.addSheet = addSheet;
    WorkBook.prototype.getSheetIndex = getSheetIndex;
    return service;

    /**
     * 工作簿类
     * @param {Number} index 选中的下标
     * @param {Array} sheets 工作表数组
     */
    function WorkBook(index, sheets) {
      this.index = index;
      this.sheets = sheets;
    }

    /**
     * 请求一个工作簿, 回打包整理稿返回
     * @param {Gundam|Object} gundom 会根据属性判断使用的序列方法, 得到条件参数
     * @param {Boolean} init 初始化
     * @return {Promise} 
     */
    function rqWorkBook(gundom, init) {
      var params = gundom.sequence ? gundom.sequence() : gundamFactory.sequenceOXC(gundom);
      return dataService.get(init===true?'init':'sync', params).then(function(workbookSource) {
        return parse(workbookSource);
      });
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
     * 根据下标选中一个表, 更新选中下标
     * @param  {Number} index 预选中的下标
     * @return {Sheet} 选中的表|undefined
     */
    function selected(index) {
      var sheet = this.sheets[index];
      if (sheet) { this.index = index; }
      return sheet;
    }

    /**
     * 删除指定下标的表
     * @param  {Number} index 下标
     * @return {Array} 删除后的表数组
     */
    function remove(index) {
      var sheets = this.sheets.splice(index, 1);
      return sheets;
    }

    /**
     * 根据id返回一个表下标
     * @param {String} id
     * @return {Number} 下标
     */
    function getSheetIndex(id) {
      var sheets = this.sheets;
      for (var i = 0, ilen = sheets.length; i < ilen; i++) {
        var sheet = sheets[i];
        if (sheet.id === id) { return i; }
      }
      return false;
    }

    /**
     * 合并两个工作簿, 根据sheetId判断表的唯一
     * @param  {WorkBook} workbook 工作簿
     * @return {Number} 选中的下标
     */
    function merger(workbook) {
      var twb = this, index = this.index;
      var sheets = workbook.sheets;

      angular.forEach(sheets, function(sheet, i) {
        var tIndex = twb.getSheetIndex(sheet.id);
        if (tIndex !== false) { // 存在替换
          twb.sheets[tIndex] = sheet;
        } else {
          index = twb.addSheet(sheet);
        }
      });
      return index;
    }

    /**
     * 解析成工作簿对象
     * @param {Array} source 源数据
     * @return {WorkBook}
     */
    function parse(source) {
      var index = null;
      var sheets = [];

      angular.forEach(source, function(sheetSource, index) {
        var sheet = sheetFactory.parse(sheetSource);
        sheets.push(sheet);
        // 
        // 默认选中
        // if (selectedIndex === null) { selectedIndex = 0; }
      });
      return new WorkBook(index, sheets);
    }
  }

})();