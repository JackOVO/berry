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
    WorkBook.prototype.selected = selected;
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
     * @param  {Gundam|Object} gundom 会根据属性判断使用的序列方法, 得到条件参数
     * @return {Promise} 
     */
    function rqWorkBook(gundom) {
      var params = gundom.sequence ? gundom.sequence() : gundamFactory.sequenceOXC(gundom);
      return dataService.get('sync', params).then(function(workbookSource) {
        return parse(workbookSource);
      });
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