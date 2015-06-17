(function() {
  'use strict';

  angular
    .module('platform.recommend')
    .factory('recommendBean', recommendBean);

  function recommendBean() {
    var service = {
      'parse': parse
    };
    return service;

    function Recommend(code, text, checked) {
      this.code = code;
      this.text = text;
      this.checked = checked || false;
    }

    /**
     * 从后台获取的源推荐会根据特征转换成前台推荐实体
     * @param  {Object} source 源推荐项
     * @param  {String} type 对应转换的方法类型, 即不同的源都转换成统一的推荐实体
     * @return {Recommend} 转换后的推荐实体
     */
    function parse(source, type) {
      var code = source.indicatorCode;
      var text = source.indicatorName;

      return new Recommend(code, text, false);
    }
  }

})();