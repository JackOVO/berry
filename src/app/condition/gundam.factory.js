(function() {
  'use strict';

  angular
    .module('pf.condition')
    .factory('gundamFactory', gundamFactory);

  function gundamFactory() {
    var service = {
      'sequenceOXC': sequenceOXC
    };
    Gundam.prototype.sequence = sequence;
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
      console.info(params);
      return params;
    }

  }

})();