(function() {
  'use strict';

  angular
    .module('platform.directive')
    .factory('handsontableService', handsontableService);

  function handsontableService() {
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
          cellProperties.format = '0,0000.0';
          return cellProperties;
        }
      };
      return angular.extend(_settings, settings);
    }

    function PolicemenRenderer(instance, td, row, col, prop, value) {
      var that = this;
      RowRenderer.apply(this, arguments);
      Handsontable.renderers.NumericRenderer.apply(this, arguments);

      if (_table.special[row] && _table.special[row][col]) {
        var colSpecial = _table.special[row][col];
        switch(colSpecial.type) {
          case 'indicator':
            IndicatorRenderer.apply(that, arguments);
            break;
        }
      }
    };
    function RowRenderer(instance, td, row) {
      if (row % 2 !== 0) { td.style.backgroundColor = '#F9F9F9'; }
    };
    function IndicatorRenderer(instance, td) {
      Handsontable.renderers.HtmlRenderer.apply(this, arguments);
      // td.style.verticalAlign = 'middle';

      var icon = $('<i class="icon-btn icon-info"></i>');
      icon.click();
      if (!$(td).children('.icon-btn').length) {
        $(td).append(icon);
      }
    }
  }

})();