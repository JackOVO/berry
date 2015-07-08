(function() {
  'use strict';

  angular
    .module('platform.directive')
    .directive('handsontable', handsontableDirective);

  function handsontableDirective() {
    return {
      template: '<div></div>',
      link: function(scope, element, attrs) {
        var hd = null;

scope.$watch('scvm.sheet.table', function(n) {
  if(n) {
    if (hd) {
      hd.loadData(n.data);
    } else {
      hd = new Handsontable(element[0], {data: n.data, colHeaders: true, rowHeaders: true});
    }
  }
});
        // new Handsontable(element[0], {
        //   data: data(),
        //   colHeaders: true,
        //   rowHeaders: true,
        //   stretchH: 'all',
        //   columnSorting: true,
        //   contextMenu: true
        // });
      }
    };
  }

})();