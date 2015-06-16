(function() {
  'use strict';

  angular
    .module('platform.directive')
    .directive('tree', treeDirective);

  function treeDirective() {
    return {
      replace: true,
      scope: {'data': '='},
      template: '<div></div>',
      link: function(scope, element, attr) {

        element.attr('id', 'zt' + new Date().getTime());

        var setting = {
          view: {showIcon:false, showTitle: false},
          check: {enable: true, chkboxType: { 'Y': '', 'N': '' }},
          data: {key: { 'name': 'name', 'children': 'childs'}}
        };

        console.info($.fn.zTree.init(element, setting, scope.data));
      }
    };
  }

})();