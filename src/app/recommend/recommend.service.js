(function() {
  'use strict';
  // 推荐类型的扩展

  angular
    .module('platform.recommend')
    .factory('recommendService', recommendService);

  recommendService.$inject = ['dataService', 'sheetService'];
  function recommendService(dataService, sheetService) {
    var _recommendChange = {}; // 缓存
    var service = {
      'getRecommend': getRecommend,
      'getSelectRecord': getSelectRecord,
      'requireRecommend': requireRecommend,
      'clearSelectRecord': clearSelectRecord,
      'selectedRecommend': selectedRecommend
    };
    return service;

    // 返回缓存
    function getRecommend(type) {
      var sheetId = sheetService.getSheetId();
      return _recommendChange[sheetId];
    }

    /**
     * 请求推荐内容
     * @param  {String} type 推荐类型(扩展用?)
     * @return {Promise} 承诺
     */
    function requireRecommend(type) {
      var sheetId = sheetService.getSheetId();
      var params = {'sheetId': sheetId};

      return dataService.get('recommend', params)
        .then(function(recommendSource) {
          _recommendChange[sheetId] = recommendSource;
          return recommendSource; // 没做格式化处理, 由上层请求决定, 自行处理
        });
    }

    /**
     * 记录选中的记录
     * @param  {String} code 选中的代码
     * @return {Object} 全部选中项
     */
    function selectedRecommend(code) {
      var record = getSelectRecord();
      record[code] = !record[code];
      sheetService.addRecord('selectedR', record);
    }

    /**
     * 返回选择记录, 如果没有会初始化一个
     * @return {Object} 选中的对象合集
     */
    function getSelectRecord() {
      var record = sheetService.getRecord('selectedR');
      if (!record) { record = {}; }
      sheetService.addRecord('selectedR', record);
      return record;
    }

    /**
     * 清空选中记录(同步数据后要做清空处理, 防止重复添加推荐选中)
     * @return {[type]} [description]
     */
    function clearSelectRecord() {
      sheetService.addRecord('selectedR', {});
      var record = sheetService.getRecord('selectedR');
      return record;
    }
  }

})();