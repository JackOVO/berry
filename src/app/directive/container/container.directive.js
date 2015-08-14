(function() {
  'use strict';
  // 容器指令, 划分区域, 可以伸缩, 放大

  angular
    .module('pf.directive')
    .directive('row', rowDriective)
    .controller('containerCtrl', containerCtrl)
    .directive('container', containerDirective);

  function containerCtrl() {
    var that = this;
    var rows = [], countH = 0;

    that.setCount = function(height) {
      countH = height;
      var showAry = [], average = 0;
      angular.forEach(rows, function(scope, index) {
        if (scope.show === true) { showAry.push(scope); }
      });
      var size = showAry.length;
      var remainder = height % size;
      var average = (height - remainder) / size;

      angular.forEach(showAry, function(scope, index) {
        if (index !== size - 1) { scope.height = average; }
          else { scope.height = average + remainder; }
      });
    };

    that.reander = function() {
      that.setCount(countH);
    };

    that.addRow = function(scope) {
      rows.push(scope);
      scope.name = 'r' + rows.length;
    };
  }

  function containerDirective() {
    return {
      controller: 'containerCtrl',
      link: function(scope, element, attrs, ctrl) {
        element.css('border', '1px solid red');
        var height = element.height();
        ctrl.setCount(height);

        console.info('-container', height);
      }
    };
  }

  function rowDriective() {
    return {
      scope: true,
      replace: true,
      transclude: true,
      require: '^container',
      template: '<div ng-transclude></div>',
      link: function(scope, element, attrs, ctrl) {
        element.css('outline', '1px solid black');
        ctrl.addRow(scope);

        scope.show = (attrs.show !== 'false');

        scope.$watch('height', function(height) {
          console.info('rh', height);
          element.height(height);
        });

        scope.$watch('show', function(show) {
          if (show === true) { element.show(); }
            else { element.hide(); }
          console.info('sf');
          that.reander();
        });
      }
    };
  }

})();