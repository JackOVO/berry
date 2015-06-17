(function() {
  'use strict';

  angular
    .module('platform.directive')
    .directive('tree', treeDirective);

  var _statusChange = {};

  function treeDirective() {
    return {
      replace: true,
      scope: {'data': '=', 'oncheck': '&'},
      template: '<div></div>',
      link: function(scope, element, attr) {
        var Id = 'zt' + attr.mark; // 区分多个树
        var statusKey = attr.statuskey; // 区分多个表的状态保存
        var onCheckFn = scope.oncheck();

        var setting = {
          view: {showIcon:false, showTitle: false},
          check: {enable: true, chkboxType: { 'Y': '', 'N': '' }},
          data: {key: {'name': 'name', 'children': 'childs'}}
        };

        setting.callback = {};
        setting.callback.onClick = function(e, treeId, node) {
          ztree.checkNode(node);
          setting.callback.onCheck(e, treeId, node);
        };
        setting.callback.onCheck = function(e, treeId, node) {
          if(onCheckFn) { onCheckFn(node); }
        };

        setting.callback.onExpand = function(e, treeId, node) {
          if (!statusKey) { return; }
          setStatus(statusKey, attr.mark, node.tId, 'add');
        };
        setting.callback.onCollapse = function(e, treeId, node) {
          if (!statusKey) { return; }
          setStatus(statusKey, attr.mark, node.tId, 'del');
        };

        setting.callback.onRightClick = function(e, treeId, node) {
console.info(node);
        };

        element.attr('id', Id);
        var ztree = $.fn.zTree.init(element, setting, scope.data);
        // 获取展开记录, 并展开节点
        var expandAry = getStatus(statusKey, attr.mark);
        for (var i = 0, ilen = expandAry.length; i < ilen; i++) {
          var exNode = ztree.getNodeByTId(expandAry[i]);
          ztree.expandNode(exNode);
        }

        function getStatus(sk, type) {
          if (!_statusChange[sk]) { _statusChange[sk] = {}; };
          var statusChangeBySheet = _statusChange[sk];
          if (!statusChangeBySheet[type]) { statusChangeBySheet[type] = []; }
          return statusChangeBySheet[type];
        }

        /**
         * 保存展开状态在表->类型->array->id下
         * @param {String} sk  SheetId
         * @param {String} type DimeCode
         * @param {String} id ElementId
         * @param {String} oper 操作
         */
        function setStatus(sk, type, id, oper) {
          var array = getStatus(sk, type);

          var index = array.indexOf(id);
          if (index === -1 && oper === 'add') {
            array.push(id);
          } else if (index !== -1 && oper === 'del') {
            array.splice(index, 1);
          } else {
            //console.error(index);
          }
          console.info(_statusChange);
        }
      }
    };
  }

})();