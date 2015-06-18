(function() {
  'use strict';

  angular
    .module('platform.search')
    .factory('searchService', searchService);

  searchService.$inject = ['dataService', 'sheetService', 'treeBean'];
  function searchService(dataService, sheetService, treeBean) {
    var service = {
      'require': getSearchData
    };
    return service;

    function getSearchData(type, keywords) {
      var sheetId = sheetService.getSheetId();
      var params = {
        'action': type,
        'sheetId': sheetId,
        'keywords': keywords
      };

      return dataService.get('search', params)
        .then(function(source) {
          return source;
        });
    }
  }

})();