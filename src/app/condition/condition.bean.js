(function() {
  'use strict';

  angular
    .module('platform.condition')
    .factory('conditionBean', conditionBean);

  conditionBean.$inject = ['dimensionBean'];
  function conditionBean (dimensionBean) {
    var service = {
      'parse': parse
    };
    return service;

    function Condition(sequence, direction, dimensions) {
      this.sequence = sequence;
      this.direction = direction; // 各个维度方向
      this.dimensions = dimensions;
    }

    /**
     * 由后台源解析成前台实体
     * @param  {Object} source 后台源数据
     * @return {Object} 解析后的实体
     */
    function parse(source) {
      var sequence = extractSequence(source);
      var direction = {};
      var dimensions = [], dimSources = source.dimensionVOLst;
      for (var i = 0, ilen = dimSources.length; i < ilen; i++) {
        var dimItem = dimSources[i];
        var dimension = dimensionBean.parse(dimItem);
        dimensions.push(dimension);
      }

      return new Condition(sequence, direction, dimensions);
    }

    /**
     * 提取出维度的位置并返回
     * @param  {Object} source 源数据
     * @return {Array} 维度代码的位置
     */
    function extractSequence(source) {
      var order = ['metaColumn', 'metaRow'], sequence = [];
      for (var i = 0, ilen = order.length; i < ilen; i++) {
        var key = order[i];
        angular.forEach(source[key], function(codeName, index) {
          sequence.push(codeName);
        });
      }

      return sequence;
    }
  }
})();