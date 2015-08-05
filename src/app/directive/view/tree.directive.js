(function() {
  'use strict';
  // 树结构显示指令, 提供接口

  var _statusChange = {}; // 状态缓存
  var _rightMenuData = [
    {'key': 'sel', 'text': '全选'},
    {'key': 'unsel', 'text': '反选'},
    '-',
    {'key': 'sel-peer', 'text': '全选 同级'},
    {'key': 'unsel-perr', 'text': '反选 同级'},
    '-',
    {'key': 'sel-son', 'text': '全选 子级'},
    {'key': 'unsel-son', 'text': '反选 子级'}
  ];
  var _getClickCallback = function(treeId, node) {
    var ztree = $.fn.zTree.getZTreeObj(treeId);

    /**
     * 根据操作类型, 对节点数组做全选/反选操作
     * @param  {Object} nodes 节点组
     * @param  {String} oper 操作
     */
    function toggle(nodes, oper) {
      var ary = ['sel', 'sel-peer', 'sel-son'];
      for (var i = 0, ilen = nodes.length; i < ilen; i++) {
        var node = nodes[i];
        var checked = (ary.indexOf(oper) !==-1 ? true : !node.checked);
         // 挨个选中, 触发事件, 同步选中属性
        ztree.checkNode(node, checked, true, true);
      }
    }

    // 返回的点击回调
    return function(key) {
      var nodes = [];
      switch(key) {
        case 'sel':
        case 'unsel':
          nodes = ztree.transformToArray(ztree.getNodes());
          break;
        case 'sel-peer':
        case 'unsel-perr':
          var pnode = node.getParentNode();
          if (pnode === null) { nodes = ztree.getNodes(); }
           else { nodes = pnode.childs; }
          break;
        case 'sel-son':
        case 'unsel-son': nodes = node.childs; break;
        default: break;
      }
      toggle(nodes, key);
    };
  };

  angular
    .module('pf.directive')
    .directive('ztree', ztreeDirective);

  function ztreeDirective() {
    return {
      replace: true,
      template: '<div></div>',
      scope: {'data': '=', 'oncheck': '&'},
      link: function(scope, element, attr) {
        var Id = 'zt' + attr.mark; // 区分多个树
        var statusKey = attr.statuskey; // 区分多个表的状态保存
        var onCheckFn = scope.oncheck();

        // 默认配置
        var setting = {
          view: {showIcon:false, showTitle: false},
          check: {enable: true, chkboxType: { 'Y': '', 'N': '' }},
          data: {key: {'name': 'name', 'children': 'childs'}}
        };

        // 级联点击选中事件, 选中事件通知接口
        setting.callback = {};
        setting.callback.onClick = function(e, treeId, node) {
          ztree.checkNode(node, !node.checked, true, true);
        };
        setting.callback.onCheck = function(e, treeId, node) {
          if(onCheckFn) { onCheckFn(node); }
        };
        // 记录展开收起的节点, 切换时恢复状态
        setting.callback.onExpand = function(e, treeId, node) {
          setStatus(statusKey, attr.mark, node.tId, 'add');
        };
        setting.callback.onCollapse = function(e, treeId, node) {
          setStatus(statusKey, attr.mark, node.tId, 'del');
        };

        // 关联右键的操作
        setting.callback.onRightClick = function(e, treeId, node) {
          if (!node) { return; }
          var menuData = getRightMenuData(node);

          // rightMenuService.setData(menuData);
          // rightMenuService.setClick(_getClickCallback(treeId, node));
          // rightMenuService.show(event.clientY, event.clientX);
        };

        // 初始化ztree
        element.attr('id', Id);
        var ztree = $.fn.zTree.init(element, setting, scope.data);
        // 获取记录, 恢复展开节点
        var expandAry = getStatus(statusKey, attr.mark);
        //ztree.setting.expandSpeed = ''; 关闭展开动画
        for (var i = 0, ilen = expandAry.length; i < ilen; i++) {
          var exNode = ztree.getNodeByTId(expandAry[i]);
          ztree.expandNode(exNode);
        }
      }
    };
  }

  /**
   * 获取指定表下指定类型的树
   * @param {String} sk  SheetId
   * @param {String} type DimeCode
   * @return {Object} 存放
   */
  function getStatus(sk, type) {
    if (!_statusChange[sk]) { _statusChange[sk] = {}; }
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
    }
  }

  /**
   * 根据节点的属性获取菜单数据
   * @param  {Object} node 右键的节点
   * @return {Array} 菜单数据
   */
  function getRightMenuData(node) {
    var data = _rightMenuData;
    if (node.childs.length) {
      data[6].disabled = false;
      data[7].disabled = false;
    } else {
      data[6].disabled = true;
      data[7].disabled = true;
    }
    return data;
  }

})();

// (function() {
//   'use strict';

//   angular
//     .module('platform.directive')
//     .directive('tree', treeDirective);


//   treeDirective.$inject = ['rightMenuService', 'coreCF'];
//   function treeDirective(rightMenuService, config) {
//     return {
//       replace: true,
//       scope: {'data': '=', 'oncheck': '&'},
//       template: '<div></div>',
//       link: function(scope, element, attr) {
//         var statusKey = attr.statuskey; // 区分多个表的状态保存
//         
//         var spk = config.spreadKey;

//         // 搜索选中后同步选中监听
//         scope.$on(spk.searchSelectNodeChange, function(e, id) {
//           var node = ztree.getNodeByParam('id', id);
//           // 选中不会触发回调
//           ztree.checkNode(node, !node.checked, true, false);
//         });
//       }
//     };
//   }



