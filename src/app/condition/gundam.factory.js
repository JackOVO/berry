(function() {
  'use strict';

  angular
    .module('pf.condition')
    .factory('gundamFactory', gundamFactory);

  function gundamFactory() {
    var service = {
      'create': createGundam,
      'sequenceOXC': sequenceOXC
    };
    Gundam.prototype.equal = equal;
    Gundam.prototype.sequence = sequence;
    Gundam.prototype.getDImIndex = getDImIndex;
    Gundam.prototype.addSlectedCode = addSlectedCode;
    return service;

    /**
     * 名为钢弹, 对选中维度数据状态的抽取
     * @param {Array} dims       选中的维度code
     * @param {Array} metaRow    行方向的维度
     * @param {Array} metaColumn 列方向的维度
     * @param {String} productId 产品线Id
     */
    function Gundam(dims, metaRow, metaColumn, productId) {
      this.dims = dims;
      this.metaRow = metaRow;
      this.productID = productId;
      this.metaColumn = metaColumn;
    }


    function createGundam(dims, metaRow, metaColumn) {
      return new Gundam(dims, metaRow, metaColumn);
    }

    /**
     * 字符串比较
     * @param  {Gundam} gundam 看不见
     * @return {Boolean}
     */
    function equal(gundam) {
      var tstring = angular.toJson(this);
      var nstring = angular.toJson(gundam);
      return tstring === nstring;
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
     * 可预见的将chaos创建成Gundam对象, 在序列可提交的条件.
     * @param  {Object} chaos {k, v}形式
     * @return {Object} 标准提交格式的对象
     */
    function sequenceOXC(chaos) {
      var dims = chaos.dims;
      var metaRow = chaos.metaRow;
      var metaRow = chaos.metaRow;
      var productId = chaos.productID;

      var gundam = new Gundam(dims, metaRow, metaRow, productId);
      return gundam.sequence();
    }

    /**
     * 序列化成标准提交格式的条件
     * @return {Object}
     */
    function sequence() {
      var gundam = this, params = {};
      params.dims = angular.toJson(gundam.dims);

      if (gundam.sheetId) { params.sheetId = gundam.sheetId; }
      if (gundam.metaRow) { params.metaRows = gundam.metaRow.join('-'); }
      if (gundam.productID) { params.productID = gundam.productID; }
      if (gundam.metaColumn) { params.metaColumns = gundam.metaColumn.join('-'); }

      return params;
    }

  }

})();