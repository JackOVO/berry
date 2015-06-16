(function() {
  'use strict';

  angular
    .module('platform.recommend')
    .controller('LeftRecommendCtrl', LeftRecommendCtrl);

  // 考虑多种推荐问题, 不采用广播的方式绑定数据, 而从承诺中直接获取
  LeftRecommendCtrl.$inject = ['$scope', 'recommendService'];
  function LeftRecommendCtrl($scope, recommendService) {
    var _feature = null;
    var that = this;
    that.title = '相关推荐';

    // 当前属性是根据控制器上下文获取的, 耦合较高, 为了在多个推荐的情况下可以区分
    if ($scope.dim && $scope.dim.feature) {
      _feature = $scope.dim.feature;
    }

    console.info($scope.dim);
    recommendService.require();
  }

})();