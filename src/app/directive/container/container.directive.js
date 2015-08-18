(function() {
  'use strict';
  // 容器指令, 划分区域, 可以伸缩, 放大
  
  angular
    .module('pf.directive')
    .directive('row', rowDriective)
    .controller('containerCtrl', containerCtrl)
    .directive('container', containerDirective);

  containerCtrl.$inject = ['$scope', 'coreCF'];
  function containerCtrl($scope, config) {
    var _spk = config.spreadKey;
    var _countHeight = 0; // 容器总高度
    var _rowScopes = []; // 行作用域

    var that = this;
    that.pushRowScope = pushRowScope;
    that.setRowHeight = setRowHeight;
    that.setCountHeight = setCountHeight;
    that.getRowScopeByName = getRowScopeByName;

    // 设置容器总高度
    function setCountHeight(height){
      _countHeight = height;
      rendar(_countHeight);
    }
    // 添加行作用域
    function pushRowScope(scope) {
      _rowScopes.push(scope);
      return _rowScopes.length;
    }
    // 平均渲染
    function rendar(height) {
      var showScope = [];
      angular.forEach(_rowScopes, function(scope, index) {
        if (!scope.name) { scope.name = 'r' + index; }
        if (scope.show === true) { showScope.push(scope); }
      });
      var showCount = showScope.length;
      var remainder = height % showCount; // 总高/总显示数
      var average = (height - remainder) / showCount;

      angular.forEach(showScope, function(scope, index) {
        scope.height = average;
        if (index === showCount - 1) { scope.height += remainder; }
      });
      $scope.$broadcast(_spk.containerSizeChange);
    }
    // 获取指定名作用域
    function getRowScopeByName(name) {
      for (var i = 0, ilen = _rowScopes.length; i < ilen; i++) {
        var rowScope = _rowScopes[i];
        if (rowScope.name === name) { return rowScope; }
      }
    }
    // 获取指定行下标
    function getRowIndexByName(name) {
      for (var i = 0, ilen = _rowScopes.length; i < ilen; i++) {
        var rowScope = _rowScopes[i];
        if (rowScope.name === name) { return i; }
      }
      return -1;
    }
    // 切换指定作用域显示状态
    function toggleRowStatus(name) {
      var rowScope = getRowScopeByName(name);
      if (!rowScope) { return; }
      rowScope.show = !rowScope.show;
      rendar(_countHeight);
    }
    // 设置定制行高度
    function setRowHeight(name, height) {
      var nowRowIndex = getRowIndexByName(name);
      if (nowRowIndex === -1) { return; }
      var nowRow = _rowScopes[nowRowIndex];
      var brotherRow = _rowScopes[nowRowIndex - 1] || _rowScopes[nowRowIndex + 1];

      var amount = nowRow.height - height;
      if (height < 100 || brotherRow.height + amount < 100) { return; }
      nowRow.height = height;
      brotherRow.height = brotherRow.height + amount;
      $scope.$broadcast(_spk.containerSizeChange);
    }
  }

  function containerDirective() {
    return {
      controller: 'containerCtrl',
      link: function(scope, element, attrs, ctrl) {
        var height = element.height();
        ctrl.setCountHeight(height);
      }
    }
  }

  function rowDriective() {
    return {
      scope: true,
      replace: true,
      transclude: true,
      require: '^container',
      template: '<div ng-transclude></div>',
      link: function(scope, element, attrs, ctrl) {
        // element.css('padding-top', '10px');
        scope.show = (attrs.show !== 'false');
        scope.$watch('height', function(height) {
          element.height(height);
        });
        scope.$watch('show', function(show) {
          if (show === true) { element.show(); }
            else { element.hide(); }
        });

        var index = ctrl.pushRowScope(scope);

        if (index !== 1) { // 不是第一个
          var tborder = $('<div class="bx"></div>');
          tborder.prependTo(element).mousedown(function(e) {
            var originY = e.pageY;
            var nowHeight = ctrl.getRowScopeByName(scope.name).height;

            $('body').mousemove(function(e) {
              var amount = originY - e.pageY;
              ctrl.setRowHeight(scope.name, nowHeight + amount);
              scope.$apply();
            }).one('mouseup', function(){ $(this).unbind('mousemove'); });
          });
        }
      }
    };
  }

})();
