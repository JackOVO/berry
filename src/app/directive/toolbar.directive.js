(function() {
  'use strict';
  angular
    .module('pf.directive')
    .directive('toolbar', toolbarDirective);

  function toolbarDirective () {
    return {
      templateUrl: 'app/template/toolbar.html'
    };
  }
})();