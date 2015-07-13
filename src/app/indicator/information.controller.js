(function() {
  'use strict';

  angular
    .module('platform.indicator')
    .controller('IndicatorCtrl', IndicatorCtrl);

  IndicatorCtrl.$inject = ['$scope', '$rootScope', 'informationService', 'coreCF'];
  function IndicatorCtrl($scope, $rootScope, informationService, config) {
    var _spk = config.spreadKey;
    var that = this;
    that.style = null;
    that.toggle = toggle;
    that.infomation = null;

    // 数据更新
    $scope.$on(_spk.infomationChange, function(e, infomation) {
      that.infomation = infomation;
    });
    
    // 开关监听
    $scope.$on(_spk.rightInfoIsOpenChange, function(e, isOpen) {
      $scope.isOpen = isOpen;
    });

    $scope.$watch('isOpen', function(isOpen) {
      if (isOpen === true) { that.style = {'display':'block'};
      } else { that.style = {'width':0,'padding':0,'display':'block'}; }
      $rootScope.$broadcast(_spk.containerSizeChange);
    });

    // 切换开关, 还是用Service控制
    function toggle() {
      informationService.toggle();
    }
  }

})();