(function() {
  'use strict';

  angular
    .module('platform.directive')
    .directive('handsontable', handsontableDirective);

  function handsontableDirective() {
    return {
      replace: true,
      template: '<div style="width:100%;height:100%;padding-top:10px;outline:1px solid orange;">'+          '<div id="x" style="outline:1px solid red;"></div>'
                +'</div>',
      scope: {'table': '='},
      link: function(scope, element, attrs) {
        var _handsontable = null;
        var _container = element.children('#x');

        scope.$watch('table', function(table) {
          if (!table) { return; }
console.info(table);
          var width = element.width();
          var height = element.height();

          if (_handsontable) { _handsontable.destroy(); }

          _handsontable = new Handsontable(_container[0],{
            rowHeaders: true,
            colHeaders: true,
            data: table.data,
            width: width, height: height,
            mergeCells: table.mergeCells,
            fixedRowsTop: table.fixedRowsTop,
            fixedColumnsLeft: table.fixedColumnsLeft
          });

          

          // _handsontable.updateSettings({

          // }, true);
        });



//         
//         console.info(container);

//         scope.$watch('table', function(table) {
//           if (!table) { return; }
// console.info(table);

//           

//           if (!_handsontable) {
//             _handsontable =  new Handsontable(container[0], {
//               
//               
//               data: table.data,
//               
//             });
//           } else {
//             var width = element.width();
//             var height = element.height();
//             _handsontable.updateSettings({width: width, height: height});
//             _handsontable.loadData(table.data);
//           }
//         });


        $(window).resize(function() {
          var width = element.width();
          var height = element.height();
          _handsontable.updateSettings({width: width, height: height});
        });
      }
    };
  }

})();

//         var _handsontable = null;

// $(window).resize(function() {
// var width = element.width();
// var height = element.height();
// console.info(width, height);
// });

//         

//         $(window).resize(function(e) {
// ////////////////////////////////////////////////////////////
// //var width = element.width(), height = element.height(); //
// ////////////////////////////////////////////////////////////
// console.info(element.width(), element.height());
//         });
      //   }
      // }