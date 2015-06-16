(function() {
  'use strict';

  angular
    .module('platform.dimension')
    .factory('dimensionBean', dimensionBean);

  dimensionBean.$inject = ['treeBean'];
  function dimensionBean (treeBean) {
    var service = {
      'parse': parse
    };
    return service;

    function Dimension (code, name, tree, feature) {
      this.code = code;
      this.name = name;
      this.tree = tree;
      this.feature = feature; // 描述维度特征
    }

    /**
     * 由后台源解析成前台实体
     * @param  {Object} source 后台源数据
     * @return {Object} 解析后的实体
     */
    function parse(source) {
      var code = source.codeName;
      var name = source.showName;
      var tree = treeBean.parse(source);
      var feature = extractFeature(source);

      return new Dimension(code, name, tree, feature);
    }

    /**
     * 提取转化后台维度源特征
     * @param  {Object} source 麻烦死
     * @return {Object} 结果
     */
    function extractFeature(source) {
      var feature = {};
      if (source.hierarchical) { feature.tree = true; } // 树结构
      if (source.needBeSearch) { feature.search = true; } // 带搜索
      if (source.isIndicator) { feature.indicator = true; } // 指标形式显示

      // 变量处理, 真的有这么搞的嘛, 传这个
      if (source.searchUrl) {
        var wh = source.searchUrl.indexOf('?');
        var paramStr = source.searchUrl.substring(wh + 1, source.searchUrl.length);
        var pairAry = paramStr.split('&');
        for (var i = 0, ilen = pairAry.length; i < ilen; i++) {
          var none = pairAry[i].split('='); //0,1
          feature[none[0]] = none[1];
        }
      }
      return feature;
    }
  }
})();