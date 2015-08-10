(function() {
  'user strict';
  angular
    .module('pf.directive')
    .directive('coolmenu', coolMenuDirective);

  function coolMenuDirective () {
    return {
      templateUrl: 'app/template/coolmenu.html'
    };
  }
})();