(function() {
  'use strict';

  angular
    .module('platform.condition')
    .factory('conditionBean', conditionBean);

  conditionBean.$inject = ['dimensionBean'];
  function conditionBean(dimensionBean) {
    var _directionMap = {'metaColumn': 'col', 'metaRow': 'row'};
    var service = {
      'parse': parse,
      'parseGundam': parseGundam
    };

    // 记录选中code, 切换sheet恢复选中
    Condition.prototype.flow = flow;
    Condition.prototype.selectedDimension = selectedDimension;
    Condition.prototype.setCurrent = function(current) { this.current = current; };
    return service;

    function Condition(sequence, direction, dimensions, selectedCode) {
      this.sequence = sequence;
      this.direction = direction; // 各个维度方向
      this.dimensions = dimensions;

      this.current = null; // 当前条件序列化的值, 判断同步用
      this.selectedCode = selectedCode;
    }

    // 选中维度对象(提交的条件?, 传输条件对象)
    function Gundam(dims, productId) {
      this.dims = dims;
      this.productId = productId;
    }

    /**
     * 由后台源解析成前台实体
     * @param  {Object} source 后台源数据
     * @return {Object} 解析后的实体
     */
    function parse(source) {
      var locate = extractLocate(source);
      var sequence = locate[0];
      var direction = locate[1];
      var dimensions = {}, dimSources = source.dimensionVOLst;
      var selectedCode = sequence.length > 0 ? sequence[1] : null; // 默认选中

      for (var i = 0, ilen = dimSources.length; i < ilen; i++) {
        var dimItem = dimSources[i];
        var dimension = dimensionBean.parse(dimItem);
        dimensions[dimension.code] = dimension;
      }
      var condition = new Condition(sequence, direction, dimensions, selectedCode);
      condition.current = condition.flow(); // 同步判断用

      return condition;
    }

    /**
     * 转化选择的维度数据条件对象
     * @param  {Object} source 为转换的源
     * @return {Object} 前台所用的实体
     */
    function parseGundam(source) {
      var dims = {}; // {code: [id, id, ...]}
      var array = source.dim; 
      var productId = source.productId;
      return new Gundam(array, productId);
    }

    /**
     * 提取出维度的位置并返回
     * @param  {Object} source 源数据
     * @return {Array} 维度代码的位置
     */
    function extractLocate(source) {
      var sequence = [], // 位置
          direction = {},// 方向
          order = ['metaColumn', 'metaRow'];

      for (var i = 0, ilen = order.length; i < ilen; i++) {
        var key = order[i];
        angular.forEach(source[key], function(code, index) {
          sequence.push(code);
          direction[code] = _directionMap[key];
        });
      }
      return [sequence, direction];
    }

    function selectedDimension(code) {
      this.selectedCode = code;
    }

    // 序列化(供提交用)
    function flow() {
      var sequence = this.sequence,
          direction = this.direction,
          dimensions = this.dimensions;
      var result = {};
      var dims = [], metaColumns = [], metaRows = [];

      //按顺序来
      angular.forEach(sequence, function(key, index) {
        var dim = dimensions[key].flow();
        dims.push(dim);
      });
      result.dims = dims;

      // 按顺序来
      angular.forEach(sequence, function(code, index) {
        var status = direction[code];
        if (status === _directionMap['metaColumn']) {
          metaColumns.push(code);
        } else if (status === _directionMap['metaRow']) {
          metaRows.push(code)
        } else {
          console.error('条件方向序列化失败', code, status);
        }
      });
      result.metaRow = metaRows.join('-');
      result.metaColumn = metaColumns.join('-');

      return result;
    }
  }

})();
