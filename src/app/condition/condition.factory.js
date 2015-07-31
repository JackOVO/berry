(function() {
  'use strict';
  // 条件类工厂

  angular
    .module('pf.condition')
    .factory('conditionFactory', conditionFactory);

  conditionFactory.$inject = ['dimensionFactory'];
  function conditionFactory(dimensionFactory) {
    var _directionMap = {'metaColumn': 'col', 'metaRow': 'row'};
    var service = {
      'parse': parse
    };
    return service;

    /**
     * 条件容器类
     * @param {Array} order 维度顺序
     * @param {Object} direction 维度代码:方向
     * @param {Object} dimensions 维度代码:维度
     * @param {Gundam} current 初始化选中
     */
    function Condition(order, direction, dimensions, current) {
      this.order = order;
      this.current = current;
      this.direction = direction;
      this.dimensions = dimensions;
    }

    /**
     * 解析成条件对象
     * @param  {Object} conditionSource 对象源
     * @return {Condition}
     */
    function parse(conditionSource) {
      var locate = extractLocate(conditionSource);
      var order = locate[0], direction = locate[1];
      var dimensions = {}, dimSources = conditionSource.dimensionVOLst; // 维度

      for (var i = 0, ilen = dimSources.length; i < ilen; i++) {
        var dimItem = dimSources[i];
        var dimension = dimensionFactory.parse(dimItem);
        dimensions[dimension.code] = dimension;
      }
      var condition = new Condition(order, direction, dimensions, null);
      // condition.current = condition.press(); // 方便判断同步状态
      return condition;
    }

    /**
     * 提取出维度的位置并返回
     * @param  {Object} source 源数据
     * @return {Array} 维度代码的位置 
     */
    function extractLocate(source) {
      var list = source.dimensionVOLst;
      var order = [], // 排序
          direction = {},// 方向
          array = ['metaColumn', 'metaRow'];

      for (var i = 0, ilen = array.length; i < ilen; i++) {
        angular.forEach(source[array[i]], function(code, index) {
          order.push(code);
          direction[code] = _directionMap[array[i]];
        });
      }
      return [order, direction];
    }
  }

})();