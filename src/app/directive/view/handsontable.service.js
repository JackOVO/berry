(function() {
  'use strict';
  // handsontable指令服务, 我觉得渲染可能要一个中间的协调者

  angular
    .module('pf.directive')
    .factory('handsontableService', handsontableService);

  handsontableService.$inject = ['$rootScope', 'indicatorService', 'informationService'];
  function handsontableService($rootScope, indicatorService, informationService) {
    var _hd = null; // 没有人说抱歉
    var _table = null;
    var _hoverIcon = null; // 唯一激活判断
    var _pive = { // 中转私有
      rmcodes: [],
      afterSelectionEndCallback: [] // 选中结束鼠标抬起回调数组
    };
    var _settings = { // 默认参数
      rowHeaders: true,
      colHeaders: true,
      manualRowResize: true, // 调整大小
      manualColumnResize: true, // 调整大小
      outsideClickDeselects: false // 点击不去掉选中
    };
    var service = {
      'settings': createSettings,
      'addSelectedAreaStyle': addSelectedAreaStyle,
      'addAfterSelectionEnd': addAfterSelectionEndCallback,
      'setHandsontable': function(handsontable){ _hd = handsontable; }
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
        },
        afterSelectionEnd: function(r, c, r2, c2) {
          var cbary = _pive.afterSelectionEndCallback;
          for (var i = 0, ilen = cbary.length; i < ilen; i++) {
            cbary[i](r, c, r2, c2);
          }
        },
        contextMenu: {
          items: {
            'rmIndicator': {
              name: '删除指标',
              disabled: rmIndicatorDisableCheck
            }
          },
          callback: function(key, opts) {
console.info(key, opts);
            switch(key) {
              case 'rmIndicator':
                if (_pive.rmcodes.length) { indicatorService.remove(_pive.rmcodes); }
                break;
              default: break;
            }
          }
        }
      };
      return angular.extend(_settings, settings);
    }

    /**
     * 添加选中事件回调函数
     * @param {Function} callback 回调方法
     */
    function addAfterSelectionEndCallback(callback) {
      if (angular.isFunction(callback)) {
        _pive.afterSelectionEndCallback.push(callback);
      }
    }

    /**
     * 对选中的区域添加样式
     * @param {Object} style
     */
    function addSelectedAreaStyle(style) {
      var area = _hd.getSelected();
      getAreaCood(area[0], area[1], area[2], area[3], function(r, c){
          var cellId = _table.idmap['id'][r][c];
console.info(cellId);
      });
    }

    // 菜单禁用验证
    function rmIndicatorDisableCheck() {
      _pive.rmcodes = [];
      var size = indicatorService.getCodesSize(), area = _hd.getSelected();
      getAreaCood(area[0], area[1], area[2], area[3],
        function(row, col){
          var meta = _hd.getCellMeta(row, col), special = meta.mydata;
          if (special && special.type === 'indicator') {
            _pive.rmcodes.push(special.code);
          }
      });
      var indicSize = _pive.rmcodes.length;
      // 指标数不能为0, 不能删除所有指标
      return indicSize === 0 || size - indicSize < 1;
    }

    /**-------------------------渲染器定义-------------------------**/

    // 统一渲染
    function PolicemenRenderer(instance, td, row, col, prop, value) {
      var that = this;
      RowRenderer.apply(this, arguments); // 行渲染
      Handsontable.renderers.NumericRenderer.apply(this, arguments); // 数字格式化

      // 特殊单元格判断
      if (_table.special[row] && _table.special[row][col]) {
        var colSpecial = _table.special[row][col];
        arguments[6]['mydata'] = colSpecial;

        switch(colSpecial.type) {
          case 'indicator': IndicatorRenderer.apply(that, arguments);  break;
          case 'total': TotalRenderer.apply(that, arguments); break; // 计算对比好难!!!
          default: break;
        }

        // 存在自定义样式
        if (colSpecial.style) {
          StyleRenderer.apply(that, arguments);
        }
      }
    };

    // 行渲染器
    function RowRenderer(instance, td, row) {
      if (row % 2 !== 0) { td.style.backgroundColor = '#F9F9F9'; }
    };

    // 指标渲染器
    function IndicatorRenderer(instance, td) {
//console.info(arguments);
      // td.style.textAlign = 'center';
      Handsontable.renderers.HtmlRenderer.apply(this, arguments);

      // 保证唯一?
      if ($(td).children('.icon-btn').length) { return td; }
      var code = arguments[6]['mydata'].code;
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

    // 样式渲染器
    function StyleRenderer(instance, td) {

    }

    /**
     * 获取一个区域的坐标, 提供每个点的回调, 不分开始结束
     * @param  {Object}   start 起点
     * @param  {Object}   end 终点
     * @param  {Function} callback 回调
     */
    function getAreaCood(r1, c1, r2, c2, callback) {
      var start = {row:r1, col:c1}, end = {row:r2, col:c2};
      for(var r = (start.row < end.row ? start.row : end.row),
           rlen = r + Math.abs(start.row - end.row); r <= rlen; r++) {
        for(var c = (start.col < end.col ? start.col : end.col),
             clen = c + Math.abs(start.col - end.col); c<=clen; c++) {
          callback(r, c);
        }
      }
    }
  }

})();