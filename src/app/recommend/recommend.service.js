(function() {
  'use strict';

  angular
    .module('platform.recommend')
    .factory('recommendService', recommendService);

  recommendService.$inject = ['$q', 'sheetService', 'recommendBean', 'dataService'];
  function recommendService($q, sheetService, recommendBean, dataService) {
    // 每一组选中的推荐都会根据当前的表以及类型存放在这里, 条件用
    var _checkedRecommendChange = {};
    var service = {
      'require': getRecommend,
      'getType': getRecommendType,
      'checked': setCheckRecommend,
      'getCheckedRecord': getCheckedRecord
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
//setRecommendChange(params.sheetId, type, recommends);
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
     * 获取推荐选中记录
     * @param  {String} type 推荐类型
     * @return {Object} {code: true||false}
     */
    function getCheckedRecord(type) {
      var sheetId = sheetService.getSheetId();
      if (!_checkedRecommendChange[sheetId]) { _checkedRecommendChange[sheetId] = {}; }
      var conditionCheckChange = _checkedRecommendChange[sheetId];
      if (!conditionCheckChange[type]) { conditionCheckChange[type] = {}; }
      var dimeCheckChange = conditionCheckChange[type];
      return dimeCheckChange;
    }

    /**
     * 缓存选中推荐信息, 以当前表以及推荐的类型区分
     * @param {String} type 推荐的类型
     * @param {Recommend} 推荐项目
     */
    function setCheckRecommend(type, recommend) {
      var dimeCheckChange = getCheckedRecord(type);
      dimeCheckChange[recommend.code] = recommend.checked;
console.info(_checkedRecommendChange);
      return dimeCheckChange;
    }
  }

})();