(function() {
  'use strict';
  angular
    .module('platform.directive')
    .directive('accordion', accordionDirectve);


  function accordionDirectve () {
    return {
      templateUrl: 'app/template/container/accordion.html'
    };
  }
})();