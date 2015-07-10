(function() {
  'use strict';

  angular
    .module('platform.indicator')
    .controller('IndicatorCtrl', IndicatorCtrl);

  IndicatorCtrl.$inject = ['$rootScope', 'coreCF'];
  function IndicatorCtrl($rootScope, config) {
    var _spk = config.spreadKey;
    var that = this;
    that.infoStyle = null;
    that.toggle = toggle;

    // 切换开关, 还是用Service控制
    function toggle() {
      if (!that.infoStyle) {
        that.infoStyle = {'width': 0, 'padding': 0};
      } else {
        that.infoStyle = null;
      }
      // 容器大小变更通知
      $rootScope.$broadcast(_spk.containerSizeChange);
    }
  }

})();