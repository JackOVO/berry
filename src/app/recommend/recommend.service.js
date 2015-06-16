(function() {
  'use strict';

  angular
    .module('platform.recommend')
    .factory('recommendService', recommendService);

  recommendService.$inject = ['sheetService', 'dataService']
  function recommendService(sheetService, dataService) {
    var service = {
      'require': getRecomment
    };
    return service;

    function getRecomment() {
      var params = {};
      params.sheetId = sheetService.getSheetId();

      dataService.get('recommend', params)
        .then(function(source) {
  console.info(source);
        });
    }
  }

})();