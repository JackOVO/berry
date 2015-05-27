(function() {
  'user strict';
  angular
    .module('platform.directive')
    .directive('coolmenu', coolMenuDirective);

  function coolMenuDirective () {
    return {
      templateUrl: 'app/template/coolmenu.html'
    };
  }
})();