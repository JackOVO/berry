(function() {
  'use strict';
  // 容器指令, 划分区域, 可以伸缩, 放大

  angular
    .module('pf.directive')
    .directive('container', containerDirective);

  function containerDirective() {
    return {
      link: function(scope, element, attrs) {

      }
    }
  }

})();