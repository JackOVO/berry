(function() {
  'use strict';

  angular
    .module('platform.tree')
    .factory('treeBean', treeBean);

  function treeBean () {
    var service = {
      'parse': parseTree
    };
    Tree.prototype.checkNode = checkNode;
    Tree.prototype.getAllSel = getAllSelected;
    Tree.prototype.getAllSelCode = getAllSelectedCode;
    return service;

    function Tree(childs) {
      this.childs = childs;
    }

    function Node(code, name, childs, checked, disabled) {
      this.code = code;
      this.name = name;
      this.childs = childs;
      this.checked = checked || false;
      this.disabled = disabled || false;
    }

    /**
     * 由后台源解析成前台树实体
     * @param  {Object} source 后台源数据
     * @return {Object} 解析后的实体
     */
    function parseTree(source) {
      var root = new Tree([]);
      var list = source.objLst, chkey = 'childTree';
      recursiveTree(list, chkey, root, function(nodeSource, fater) {
        var node = parseNode(nodeSource);
        var childs = node.childs;
        fater.childs.push(node);
        return node; // 注意:返回的是当前节点的引用
      });
      return root;
    }

    /**
     * 由后台源解析成前台节点实体
     * @param  {Object} source 后台源数据
     * @return {Object} 解析后的实体
     */
    function parseNode(source) {
      var code = source.entity.code;
      var name = source.entity.name;
      var checked = source.entity.isSelected;
      var disabled = source.entity.disabled;
      return new Node(code, name, [], checked, disabled);
    }

    /**
     * 对树结构数据遍历
     * @param  {Array} array 数结构数据
     * @param  {String} chKey 子项判断key(单层)
     * @param  {Object} fater 处理结果的引用
     * @param  {Function} process 处理方法
     * @return {Object}
     */
    function recursiveTree(array, chKey, fater, process) {
      for (var i = 0, ilen = array.length; i < ilen; i++) {
        var node = array[i];
        var quote = process(node, fater); // 回调处理
        if (node[chKey].length) {
          // 下一层
          recursiveTree(node[chKey], chKey, quote, process);
        }
      }
      return fater;
    }

    /**
     * 查找一个节点
     * @param  {Array} array 节点数组
     * @param  {String} code 节点代码
     * @return {Object} node 节点
     */
    function queryNode(array, code) {
      if (!array.length) { return null; }
      var notFindAry = [];
      for (var i = 0, ilen = array.length; i < ilen; i++) {
        var node = array[i];
        if (node.code === code) {
          return node;
        } else if (node.childs.length) {
          notFindAry = notFindAry.concat(node.childs);
        }
      }
      return queryNode(notFindAry, code);
    }

    /**
     * 查找指定的属性指定值的所有节点
     * !该方法用户获取选中的节点, 效率好低, 可不可以直接在checkNode中写入节点选中的监听
     * @param  {String} attrName 属性名
     * @param  {Object} attrValue 属性值
     * @return {Array} 符号条件的所有节点
     */
    function queryNodeByAttr(tree, attrName, attrValue) {
      var list = tree.childs, result = [];
      recursiveTree(list, 'childs', null, function(node) {
        if (node[attrName] === attrValue) {
          result.push(node);
        }
      });
      return result;
    }

    /**
     * 为指定节点设置选中属性
     * @param  {String} code 节点code
     * @param  {Boolean} checked 是否
     * @return {Node} 得到的节点
     */
    function checkNode(code, checked) {
      var node = queryNode(this.childs, code);
      if (node) { node.checked = checked === undefined ? !node.checked : checked; }
      return node;
    }

    // 获取所有选中的节点
    function getAllSelected() {
      var tree = this;
      var selectedNodes = queryNodeByAttr(tree, 'checked', true);
      return selectedNodes;
    }

    // 获取全部选中节点的code
    function getAllSelectedCode() {
      var codes = [];
      var selectedNodes = this.getAllSel();
      angular.forEach(selectedNodes, function(node, index) {
        codes.push(node.code);
      });
      return codes;
    }

  }

})();