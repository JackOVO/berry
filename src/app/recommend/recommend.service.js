(function() {
  'use strict';

  angular
    .module('platform.recommend')
    .factory('recommendService', recommendService);

  recommendService.$inject = ['sheetService', 'recommendBean', 'dataService']
  function recommendService(sheetService, recommendBean, dataService) {
    // 每一组推荐都会根据当前的表以及类型存放在这里, 条件用
    var _recommendChange = {};
    var service = {
      'require': getRecommend,
      'getType': getRecommendType
    };
    return service;

    function getRecommend(type) {
      var params = {};
      params.sheetId = sheetService.getSheetId();
      // 根据type可以获取不同的推荐

      return dataService.get('recommend', params)
        .then(function(source) {
          if (source.length) {
            var recommends = [];
            angular.forEach(source, function(recommendSource, index) {
              var recommend = recommendBean.parse(recommendSource, type);
              recommends.push(recommend);
            });
            setRecommendChange(params.sheetId, type, recommends);
            return recommends;
          }
          return $q.reject('不识别的recommend源数据!' + source);
        });
    }

    /**
     * 根据维度的特征得到需要的推荐类型
     * @param  {Object} feature 特性, 由条件模块抽取
     * @return {String} 一种类型
     */
    function getRecommendType(feature) {
      var type = null;
      if (feature.indicator === true) {
        type = 'indicator';
      }
      return type; 
    }

    /**
     * 缓存推荐信息, 以当前表以及推荐的类型区分
     * @param {[type]} sheetId 当前表的id
     * @param {[type]} type 推荐的类型
     */
    function setRecommendChange(sheetId, type, recommends) {
      if (!_recommendChange[sheetId]) { _recommendChange[sheetId] = {}; }
      var sheetRecmd = _recommendChange[sheetId];
      sheetRecmd[type] = recommends;
    }
  }

})();