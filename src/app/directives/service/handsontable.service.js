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
    var _hoverIcon = null;
    function IndicatorRenderer(instance, td) {
      // td.style.textAlign = 'center';
      Handsontable.renderers.HtmlRenderer.apply(this, arguments);

      // 保证唯一?
      if ($(td).children('.icon-btn').length) { return td; }

      var code = $(td).data().code;
      var indicatorId = informationService.getNowId();
      var icon = $('<i class="icon-btn icon-info"></i>');

      if (code === indicatorId) { icon.addClass('hover'); _hoverIcon = icon;}
        else { icon.removeClass('hover'); }

      // 小icon点击和阻止选中单元格
      icon.appendTo($(td)).click(function(e) {
        informationService.toggleInfomation(code);
        indicatorId = informationService.getNowId(); // 做个样子获取一下
        $rootScope.$apply(); // 效率?

        if (indicatorId === code) {
          icon.addClass('hover');
          if (_hoverIcon) {
            _hoverIcon.removeClass('hover');
            _hoverIcon = icon;
          }
        }
      }).mousedown(function(e) { e.stopPropagation(); }); // 阻止选中单元格
      
    }
  }

})();