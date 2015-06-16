(function() {
  'use strict';
  // 维度特性装换

  angular
    .module('platform.directive')
    .directive('property', propertyDirective);

  function propertyDirective() {
    return {
      transclude: true,
      template: '<div ng-transclude></div>',
      link: function() {

      }
    };
  }

})();