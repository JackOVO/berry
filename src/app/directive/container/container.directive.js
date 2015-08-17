// (function() {
//   'use strict';
//   // 容器指令, 划分区域, 可以伸缩, 放大

//   angular
//     .module('pf.directive')
//     .directive('row', rowDriective)
//     .controller('containerCtrl', containerCtrl)
//     .directive('container', containerDirective)
//     .factory('containerService', containerService);

//   containerService.$inject = ['$rootScope'];
//   function containerService($rootScope) {
//     var service = {};
//     return service;
//   }

//   containerCtrl.$inject = ['$scope'];
//   function containerCtrl($scope) {
//     var _rowScopes = [];
//     var _countHeight = 0;
//     var that = this;

//     that.getBrother = getBrother;
//     that.addRowScope = addRowScope;
//     that.setCountHeight = setCountHeight;
//     that.getCountHeight = function(){ return _countHeight; };

//     // 添加行作用域
//     function addRowScope(scope) {
//       _rowScopes.push(scope);
//       return _rowScopes.length;
//     }
//     // 设置总高度
//     function setCountHeight(height) {
//       _countHeight = height;
//       render();
//     }
//     // 计算个数
//     function countAttr(key, value) {
//       var count = 0;
//       angular.forEach(_rowScopes, function(scope, index) {
//         if (scope[key] === value) { count++; }
//       });
//       return count;
//     }
//     // 获取行作用域
//     function getRowByName(name) {
//       for (var i = 0, ilen = _rowScopes.length; i < ilen; i++) {
//         if (_rowScopes[i].name === name) { return _rowScopes[i]; }
//       }
//       return null;
//     }
//     // 渲染
//     function render() {
//       var showCount = countAttr('show', true);
//       var remainder = _countHeight % showCount; // 总高/总显示数
//       var average = (_countHeight - remainder) / showCount;

//       angular.forEach(_rowScopes, function(scope, index) {
//         if (!scope.name) { scope.name = 'r' + index; }
//         if (scope.show === true) { scope.height = average; } // 设置高度
//       });
//     }
//     // 指定行切换
//     function toggle(name, show) {
//       var rowScope = getRowByName(name);
//       if (rowScope) { rowScope.show = show; }
//       render();
//     }
//     // 获取我和我兄弟
//     function getBrother(name) {
//       for (var i = 0, ilen = _rowScopes.length; i < ilen; i++) {
//         if (_rowScopes[i].name === name) {
//           var iii = _rowScopes[i];
//           var brother = _rowScopes[i - 1] || _rowScopes[i + 1];
//           return [iii, brother]
//         }
//       }
//     }
//   }

//   function containerDirective() {
//     return {
//       controller: 'containerCtrl',
//       link: function(scope, element, attrs, ctrl) {
//         element.css('border', '1px solid red');
//         var height = element.height();
//         ctrl.setCountHeight(height);

//         console.info('-container', height);

//         $(window).resize(function() {
//           var height = element.height();
//           ctrl.setCountHeight(height);
//         });
//       }
//     };
//   }

//   function rowDriective() {
//     return {
//       scope: true,
//       replace: true,
//       transclude: true,
//       require: '^container',
//       template: '<div ng-transclude></div>',
//       link: function(scope, element, attrs, ctrl) {
//         element.css('outline', '1px solid green');
//         scope.show = (attrs.show !== 'false');
//         var index = ctrl.addRowScope(scope);

//         if (index !== 1) { // 不是第一个
//           var tborder = $('<div class="bx"></div>');
//           tborder.prependTo(element).mousedown(function(e) {
//             // 固定
//             var pageY = e.pageY;
//             var count = ctrl.getCountHeight();
//             var brothers = ctrl.getBrother(scope.name);
//             var ah = brothers[0].height;
//             var bh = brothers[1].height;

//             $('body').mousemove(function(e) {
//               var amount = pageY - e.pageY;
// // console.info('amount', amount);
//               if (ah + amount <= 100 || bh - amount <= 100) { return; }
//               brothers[0].height = ah + amount;
//               brothers[1].height = bh - amount;
//               scope.$apply();

//             }).mouseup(function(){ $('body').unbind('mousemove'); });

//           });
//         }

//         scope.$watch('height', function(height) {
//           element.height(height);
//         });

//         scope.$watch('show', function(show) {
//           if (show === true) { element.show(); }
//             else { element.hide(); }
//         });
//       }
//     };
//   }

// })();