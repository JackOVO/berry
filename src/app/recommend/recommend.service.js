(function() {
  'use strict';
  // 推荐模块服务, 获取缓存工作

  angular
    .module('pf.recommend')
    .factory('recommendService', recommendService);

  recommendService.$inject = ['$q', 'recommendFactory', 'sheetService'];
  function recommendService($q, recommendFactory, sheetService) {
    var _recommendChange = {}; // 推荐缓存 id:数据
    var service = {
      'addSelected': addSelected,
      'getSelected': getSelected,
      'getRecommend': getRecommend
    };
    return service;

    /**
     * 请求推荐的封装, 会缓存对象
     * @param {Boolean} isRq 是否强请求
     * @return {Promise}
     */
    function getRecommend(isRq) {
      var sheetId = sheetService.getSheetId();
      var change = _recommendChange[sheetId];

      if (!change || isRq === true) {
        return recommendFactory.rqRecommend(sheetId).then(function(reList) {
          _recommendChange[sheetId] = reList;
          return reList;
        });
      }

      // var defer = $q.defer();
      // var promise = defer.promise;
      // return promise;
      return _recommendChange[sheetId];
    }

    /**
     * 返回当亲表推荐选中
     * @return {k:v} 记录选中
     */
    function getSelected() {
      var record = sheetService.getRecord('reSelected');
      if (!record) { record = {}; }
      sheetService.setRecord('reSelected', record);
      return record;
    }

    /**
     * 添加一条选中, 为true反选
     */
    function addSelected(code) {
      var record = getSelected();
      record[code] = !record[code];
      sheetService.setRecord('reSelected', record);
      return getSelected();
    }
  }

})();


// (function() {
//   'use strict';
//   // 推荐类型的扩展

//   angular
//     .module('platform.recommend')
//     .factory('recommendService', recommendService);

//   recommendService.$inject = ['dataService', 'sheetService'];
//   function recommendService(dataService, sheetService) {
//     var _recommendChange = {}; // 缓存
//     var service = {
//       'getRecommend': getRecommend,
//       'getSelectRecord': getSelectRecord,
//       'requireRecommend': requireRecommend,
//       'clearSelectRecord': clearSelectRecord,
//       'selectedRecommend': selectedRecommend
//     };
//     return service;

//     // 返回缓存
//     function getRecommend(type) {
//       var sheetId = sheetService.getSheetId();
//       return _recommendChange[sheetId];
//     }




//     /**
//      * 清空选中记录(同步数据后要做清空处理, 防止重复添加推荐选中)
//      * @return {[type]} [description]
//      */
//     function clearSelectRecord() {
//       sheetService.addRecord('selectedR', {});
//       var record = sheetService.getRecord('selectedR');
//       return record;
//     }
//   }

// })();