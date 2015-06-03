(function() {
  'use strict';

  angular
    .module('platform.condition')
    .factory('conditionService', conditionService);

  conditionService.$inject = ['$rootScope', 'coreCF'];
  function conditionService($rootScope, config) {
    var service = {};
    var priv = {
      'nowCondition': null
    };
    var spk = config.spreadKey;
    return service;

    function updateNowCondition(condition) {
      priv.nowCondition = condition;
      $rootScope.$broadcast(spk.nowConditionChange, condition);
      return priv.nowCondition;
    }
  }
})();