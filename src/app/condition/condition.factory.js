(function() {
  'use strict';

  angular
    .module('platform.condition')
    .factory('conditionFactory', conditionFactory);

  conditionFactory.$inject = ['dimensionFactory'];
  function conditionFactory(dimensionFactory) {
    var _directionMap = {'metaColumn': 'col', 'metaRow': 'row'};
    var service = {
      'parse': parse
    };
    Condition.prototype.press = press;
    Condition.prototype.toggle = toggle;
    Gundam.prototype.equal = equal;
    Gundam.prototype.getDImIndex = getDImIndex;
    Gundam.prototype.addSlectedCode = addSlectedCode;
    return service;

    // 条件载体对象
    function Condition(order, direction, dimensions, current) {
      this.order = order;
      this.direction = direction;
      this.dimensions = dimensions;
      this.current = current;
    }

    // 选中对象吧
    function Gundam(dims, metaRow, metaColumn) {
      this.dims = dims;
      this.metaRow = metaRow;
      this.metaColumn = metaColumn;
    }

    /**
     * 对比Gundam
     * @param  {Gundam} gundam 看不见
     * @return {Boolean}
     */
    function equal(gundam) {
      var tstring = angular.toJson(this);
      var nstring = angular.toJson(gundam);
      return tstring === nstring;
    }

    /**
     * 获取一个维度下标
     * @param  {String} code 维度代码
     * @return {Array} 选中维度数据
     */
    function getDImIndex(code) {
      var array = this.dims;
      for (var i = 0, ilen = array.length; i < ilen; i++) {
        var dim = array[i];
        if (dim.codeName === code) { return i; }
      }
      return false;
    }

    /**
     * 添加选中的code
     * @param {String} dimCode 维度代码
     * @param {Array|Object} codes 选中ID的合集
     */
    function addSlectedCode(dimCode, codes) {
      var index = this.getDImIndex(dimCode);
      if (index !== false) {
        var selectedCode = this.dims[index].codes;
        angular.forEach(codes, function(bl, code) {
          if (bl === true) { selectedCode.push(code); }
        });
      }
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
      condition.current = condition.press(); // 方便判断同步状态
      return condition;
    }

    /**
     * 切换维度方向
     * @param {String} code 维度的代码
     * @return {String} 返回切换后的维度代码
     */
    function toggle(code) {
      var direction = this.direction[code];
      if (direction) {
        this.direction[code] = (direction === 'col' ? 'row' : 'col');
      } else {
        console.error('错误的维度代码!', code)
      }
      return this.direction[code];
    }

    /**
     * 将条件对象压成钢弹, 即提交用户的参数对象
     * @return {Gundam} 参数对象
     */
    function press() {
      var order = this.order,
          direction = this.direction,
          dimensions = this.dimensions;
      var dims = [], metaRows = [], metaColumns = [];

      angular.forEach(order, function(key, index) {
        var dim = dimensions[key].press(); // 维度流化, 提取
        dims.push(dim);
      });

      // 按顺序来
      angular.forEach(order, function(code, index) {
        var status = direction[code];
        if (status === _directionMap['metaColumn']) {
          metaColumns.push(code);
        } else if (status === _directionMap['metaRow']) {
          metaRows.push(code)
        } else {
          console.error('条件方向序列化失败', code, status);
        }
      });
      return new Gundam(dims, metaRows, metaColumns);
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