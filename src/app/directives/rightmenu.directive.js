(function() {
  'use strict';

  angular
    .module('platform.directive')
    .directive('rightmenu', rightmenuDirective);

  function rightmenuDirective() {
    return {
      replace: true,
      controller: RightMenuCtrl,
      templateUrl: 'app/template/rightmenu.html',
      link: function(scope, element, attr, ctrl) {

        // 监听属性变化
        scope.$watch('property', function(property) {
          if (property) {
            var css = {
              'top': property.top,
              'left': property.left + 5,
              'display': property.show === true ? 'block' : 'none'
            };
            element.css(css);
          }
        }, true);

        $(window).mouseup(function() {
          ctrl.hide();
        });
      }
    };
  }

  RightMenuCtrl.$inject = ['$scope', 'rightMenuService', 'coreCF'];
  function RightMenuCtrl($scope, rightMenuService, config) {
    var spk = config.spreadKey;
    var that = this;
    that.hide = rightMenuService.hide;

    $scope.property = {show: false};
    $scope.click = function(key) {
      if (key) { rightMenuService.click(key); }
    };

    // 监听属性変更通知, 更改属性
    $scope.$on(spk.rightMenuPropertyChange, function(e, property) {
      $scope.property = property;
      $scope.$apply();
    });

    // 监听菜单数据変更通知, 改变数据
    $scope.$on(spk.rightMenuDataChange, function(e, menuData) {
      $scope.data = menuData;
    });
  }

})();