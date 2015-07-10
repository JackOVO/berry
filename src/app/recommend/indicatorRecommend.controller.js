(function() {
  'use strict';

  angular
    .module('platform.recommend')
    .controller('indicatorRecommend', indicatorRecommend);

  indicatorRecommend.$inject = ['$scope', 'recommendService', 'coreCF'];
  function indicatorRecommend($scope, recommendService, config) {
    var _spk = config.spreadKey;
    var that = this;
    that.type = 'indicator';
    that.title = "指标推荐";
    that.recommends = null; // 推荐内容
    that.selectRecord = null; // 选择记录

    that.selected = selectedRecommend;

    // 监听选中变更
    $scope.$watch('irvm.selectRecord', function(nsel) {
      $scope.$emit(_spk.dimSelectedChange, nsel);
    });

    // 由上层通知更新推荐
    $scope.$on(_spk.refreshRecommend, function(e, type) {
      recommendService.requireRecommend()
        .then(function(recommendSource) {
          that.recommends = recommendSource;
          if (that.recommends.length) {
            // ?????
            that.selectRecord = recommendService.getSelectRecord();
            that.title = '指标推荐';
          } else {
            that.title = '无相关推荐';
            console.info('后台不给推荐, 你让我上哪给你搞去~');
          }
        });
    });

    // 获取缓存推荐
    $scope.$on(_spk.getRecommend, function(e, type) {
      that.recommends = recommendService.getRecommend();
      if (!that.recommends.length) { that.title = '无相关推荐'; }
    })

    // 第一次加载询问是否加载推荐信息(注意注册顺序问题)
    $scope.$emit(_spk.askRecommendRefresh, 'indicator');

    /**
     * 选中一项推荐
     * @param  {Object} item 推荐项目
     */
    function selectedRecommend(item) {
      var code = item.indicatorCode;
      recommendService.selectedRecommend(code);
      // 更新选择记录, 反映到视图上
      that.selectRecord = recommendService.getSelectRecord();
    }
  }

})();