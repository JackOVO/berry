(function() {
  'use strict';

  angular
    .module('platform.directive')
    .factory('handsontableService', handsontableService);

  handsontableService.$inject = ['$rootScope', 'informationService'];
  function handsontableService($rootScope, informationService) {
    var _table = {}; // 操作的table
    var _settings = {
      rowHeaders: true,
      colHeaders: true,
      manualRowResize: true, // 调整大小
      manualColumnResize: true, // 调整大小
      outsideClickDeselects: false, // 点击不去掉选中
    };
    var service = {
      'setTable': function(table){ _table = table; },
      'settings': createSettings
    };
    return service;

    // 创建配置对象
    function createSettings() {
      var settings = {
        data: _table.data,
        mergeCells: _table.mergeCells,
        fixedRowsTop: _table.fixedRowsTop,
        fixedColumnsLeft: _table.fixedColumnsLeft,
        cells: function(row, col, prop) {
          var cellProperties = {};
          cellProperties.readOnly = true; // 只读
          cellProperties.renderer = PolicemenRenderer;
          // cellProperties.renderer
          // cellProperties.type = 'numeric';
          cellProperties.format = '0,0.00';
          return cellProperties;
        }
      };
      return angular.extend(_settings, settings);
    }

    // 统一渲染
    function PolicemenRenderer(instance, td, row, col, prop, value) {
      var that = this;
      RowRenderer.apply(this, arguments);
      Handsontable.renderers.NumericRenderer.apply(this, arguments);

      if (_table.special[row] && _table.special[row][col]) {
        var colSpecial = _table.special[row][col];
        switch(colSpecial.type) {
          case 'indicator':
            $(td).data(colSpecial); // 存
            IndicatorRenderer.apply(that, arguments);
            break;
        }
      }
    };
    // 行渲染
    function RowRenderer(instance, td, row) {
      if (row % 2 !== 0) { td.style.backgroundColor = '#F9F9F9'; }
    }; 
    // 指标渲染
    function IndicatorRenderer(instance, td) {
      Handsontable.renderers.HtmlRenderer.apply(this, arguments);

      // 保证唯一?
      if ($(td).children('.icon-btn').length) { return td; }

      var code = $(td).data().code;
      var indicatorId = informationService.getNowId();
      var icon = $('<i class="icon-btn icon-info"></i>');

      if (code === indicatorId) { icon.addClass('hover'); }
        else { icon.removeClass('hover'); }

      icon.appendTo($(td)).click(function(e) {
        informationService.toggleInfomation(code);
        $rootScope.$apply();
      }).mousedown(function(e) { e.stopPropagation(); }); // 阻止选中单元格
      
    }
  }

})();