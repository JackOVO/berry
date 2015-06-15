(function() {
  'use strict';

  angular
    .module('platform.core')
    .controller('HeadCtrl', HeadCtrl);

  function HeadCtrl() {
    var that = this;
    that.index = 'http://www.dfinder.cn';
    that.title = '(╯‵□′)╯︵┻━┻';
  }
})();
