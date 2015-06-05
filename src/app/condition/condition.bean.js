(function() {
  'use strict';

  angular
    .module('platform.condition')
    .factory('conditionBean', conditionBean);

  conditionBean.$inject = ['dimensionBean'];
  function conditionBean (dimensionBean) {
    var service = {
      'parse': parse,
      'parseGundam': parseGundam
    };
    var priv = {
      'directionMap': {
        'metaColumn': 'col',
        'metaRow': 'row'
      }
    };
    Condition.prototype.selectedDimension = function(code) { this.selectedCode = code; };
    return service;

    function Condition(sequence, direction, dimensions, selectedcode) {
      this.sequence = sequence;
      this.direction = direction; // 各个维度方向
      this.dimensions = dimensions;
    }

    // 维度选中对象
    function Gundam(dims, productID) {
      this.dims = dims;
      this.productID = productID;
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

      for (var i = 0, ilen = dimSources.length; i < ilen; i++) {
        var dimItem = dimSources[i];
        var dimension = dimensionBean.parse(dimItem);
        dimensions[dimension.code] = dimension;
      }

      return new Condition(sequence, direction, dimensions);
    }

    /**
     * 转化选择的维度数据条件对象
     * @param  {Object} source 为转换的源
     * @return {Object} 前台所用的实体
     */
    function parseGundam(source) {
      var dims = {}; // {code: [id, id, ...]}
      var array = source.dim; 
      var productID = source.productID;
      return new Gundam(array, productID);
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
          direction[code] = priv.directionMap[key];
        });
      }
      return [sequence, direction];
    }

  }
})();