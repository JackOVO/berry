(function() {
  'use strict';
  // 表服务, 维护选中表操作.

  angular
    .module('pf.sheet')
    .factory('sheetService', sheetService);

  sheetService.$inject = ['$rootScope', 'coreCF'];
  function sheetService($rootScope, config) {
    var _spk = config.spreadKey;
    var _sheet = null; // 维护的表
    var service = {
      'update': sheetChange
    };
    return service;

    /**
     * 表变更方法, 通过此方法改变内部维护表
     * @param  {Sheet} sheet 传入的表
     * @return {Sheet} 内部维护的表
     */
    function sheetChange(sheet) {
      _sheet = sheet;
      $rootScope.$broadcast(_spk.sheetChange, _sheet);
      return _sheet;
    }
  }

})();