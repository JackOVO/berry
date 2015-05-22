'use strict';

  angular
    .module('platform.core')
    .controller('IndexCtrl', IndexController);

  IndexController.$inject = ['$http'];
  function IndexController ($http) {
    var that = this;
    that.index = 'http://www.dfinder.cn';
    that.title = '(╯‵□′)╯︵┻━┻';
  }
