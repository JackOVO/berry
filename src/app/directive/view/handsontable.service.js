(function() {
  'use strict';
  // handsontable指令服务, 我觉得渲染可能要一个中间的协调者

  angular
    .module('pf.directive')
    .factory('handsontableService', handsontableService);

  handsontableService.$inject = ['$rootScope', 'informationService'];
  function handsontableService($rootScope, informationService) {
    var _table = null;
    var _hoverIcon = null; // 唯一激活判断
    var _settings = { // 默认参数
      rowHeaders: true,
      colHeaders: true,
      manualRowResize: true, // 调整大小
      manualColumnResize: true, // 调整大小
      outsideClickDeselects: false // 点击不去掉选中
    };
    var service = {
      'settings': createSettings
    };
    return service;

    /**
     * 根据表格类创建handsontable配置对象
     * @param  {Table} table 表格类
     * @return {Object} handsontable配置
     */
    function createSettings(table) {
      _table = table;
      var settings = {
        data: table.data,
        mergeCells: table.mergeCells,
        fixedRowsTop: table.fixedRowsTop,
        fixedColumnsLeft: table.fixedColumnsLeft,
        cells: function(row, col, prop) {
          var cellProperties = {};
          cellProperties.readOnly = true; // 只读
          cellProperties.renderer = PolicemenRenderer;
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
      RowRenderer.apply(this, arguments); // 行渲染
      Handsontable.renderers.NumericRenderer.apply(this, arguments); // 数字格式化

      // 特殊单元格判断
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

    // 行渲染器
    function RowRenderer(instance, td, row) {
      if (row % 2 !== 0) { td.style.backgroundColor = '#F9F9F9'; }
    };

    // 指标渲染器
    function IndicatorRenderer(instance, td) {
      // td.style.textAlign = 'center';
      Handsontable.renderers.HtmlRenderer.apply(this, arguments);

      // 保证唯一?
      if ($(td).children('.icon-btn').length) { return td; }
      var code = $(td).data().code;
      var icon = $('<i class="icon-btn icon-info"></i>');
      var indicatorId = informationService.getNowId();

      if (code === indicatorId) { icon.addClass('hover'); _hoverIcon = icon;}
        else { icon.removeClass('hover'); }

      // 小icon点击和阻止选中单元格
      icon.appendTo($(td)).click(function(e) {
        informationService.toggleId(code);
        indicatorId = informationService.getNowId(); // 做个样子获取一下
        $rootScope.$apply(); // 效率?

        if (indicatorId === code) {
          icon.addClass('hover');
          if (_hoverIcon) {
            _hoverIcon.removeClass('hover');
            _hoverIcon = icon;
          }
        }
      }).mousedown(function(e) {
        e.stopPropagation();
      }); // 阻止选中单元格
    }
  }

})();