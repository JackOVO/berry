'use strict';
  angular
    .module('platform.directive')
    .directive('toolbar', toolbarDirective);

  function toolbarDirective () {
    return {
      templateUrl: 'app/template/toolbar.html'
    }
  }