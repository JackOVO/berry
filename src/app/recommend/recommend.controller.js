(function() {
  'use strict';

  angular
    .module('platform.recommend')
    .controller('LeftRecommendCtrl', LeftRecommendCtrl);

  // 考虑多种推荐问题, 不采用广播的方式绑定数据, 而从承诺中直接获取
  LeftRecommendCtrl.$inject = ['$scope', 'recommendService'];
  function LeftRecommendCtrl($scope, recommendService) {
    var that = this;
    that.type = null;
    that.title = '指标推荐'; // 可以根据类型判读更改
    that.checked = checked;
    that.checkedRecord = null; // 推荐选中记录
    that.recommends = null;

    // 当前属性是根据控制器上下文获取的, 耦合较高, 为了在多个推荐的情况下可以区分
    if ($scope.dim && $scope.dim.feature) {
      var feature = $scope.dim.feature;
      // 根据特性获取推荐类型
      that.type = recommendService.getType(feature);
      // 获取指定类型推荐的选中记录
      that.checkedRecord = recommendService.getCheckedRecord(that.type);
    } else {
      console.error('推荐控制器上下文特征不存在!');
    }

    getRecommend(that.type);

    // 获取推荐封装
    function getRecommend(type) {
      // 将特征交于服务处理, 判断获取什么样的推荐(现在不需要)
      recommendService.require(type)
        .then(function(recommends) {
console.info('更新推荐:', recommends);
          that.recommends = recommends;
        });
    }

    // 选中通知接口
    function checked(type, recommend) {
      recommend.checked = !recommend.checked;
      recommendService.checked(type, recommend);
    }

  }

})();