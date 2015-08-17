(function() {
  'use strict';
  // 信息控制器

  angular
    .module('pf.information')
    .controller('InformationCtrl', InformationCtrl)

  InformationCtrl.$inject = ['$scope', '$rootScope', 'informationService', 'coreCF'];
  function InformationCtrl($scope, $rootScope, informationService, config) {
    var _spk = config.spreadKey;
    var that = this;

    that.style = null;
    that.toggle = toggle;
    that.infomation = null;

    // 数据更新
    $scope.$on(_spk.infomationChange, function(e, infomation) {
      that.infomation = infomation;
    });

    // 开关变更监听
    $scope.$on(_spk.InfoIsOpenChange, function(e, isOpen) {
      $scope.isOpen = isOpen;
    });

    // 饿
    $scope.$watch('isOpen', function(isOpen) {
      if (isOpen === undefined) { return; }
      if (isOpen === true) {
        that.style = {'display':'block'};
        $('#plat-body-container').css('margin-right', '290px');
      } else {
        that.style = {'width':0, 'padding':0, 'display':'block'};
        $('#plat-body-container').css('margin-right', '0');
      }
      $rootScope.$broadcast(_spk.containerSizeChange);
    });

    // 切换开关, 用Service控制
    function toggle() {
      informationService.toggle();
    }
  }

})();
