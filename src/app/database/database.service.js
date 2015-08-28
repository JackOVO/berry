(function() {
  'use strict';
  // 我的数据库

  angular
    .module('pf.database')
    .factory('databaseService', databaseService);

  databaseService.$inject = ['ngDialog'];
  function databaseService(ngDialog) {
    var service = {
      'open': openDataBase
    };
    return service;

    function openDataBase() {
      ngDialog.open({
        template: 'app/template/model/databaseList.html'
      });
    }
  }

})();