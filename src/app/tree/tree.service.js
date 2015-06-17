(function() {
  'use strict';

  angular
    .module('platform.tree')
    .factory('treeService', treeService);

  treeService.$inecjt = ['sheetService', 'conditionService'];
  function treeService(sheetService, conditionService) {
    //var _statusChange = {}; // 表id->维度->数据
    var service = {
      'checked': checkedNodeByDim
    };
    return service;

    /**
     * 选中指定维度的树节点
     * @param  {String} dimCode 维度代码
     * @param  {Node} node 节点
     */
    function checkedNodeByDim(dimCode, node) {
      var code = node.code;
      var tree = conditionService.getTree(dimCode);
      var node = tree.checkNode(code);
    }
  }

})();