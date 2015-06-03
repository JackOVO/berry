#模块职责
1. workbook(工作簿模块)
  - 工作簿实体: 工作表的容器, 工作簿的状态, 后转前方法.
  - 工作簿服务: 获取源数据, 通知工作簿变更
2. sheet(工作表模块)
  - 工作表实体: 包含条件以及表格对象, 工作表属性, 后转前方法.
3. condition(条件模块)
  - 条件实体: 维度容器, 维度位置以及方向, 后转前方法, 维度位置方向提取.
4. dimension(维度模块)
  - 维度实体: 树容器, 维度属性, 以及对维度特征的描述, 后转前方法.
5. tree(树模块)
  - 树实体: 树结构数据, 框架映射类, 后转前.
6. table(表格模块)
  - 表格实体: handsontable框架映射实体, 后转前.

#事件流
1. 初始化事件流
  -核心依赖脚本加载完毕, 以用户模块为启动点.
  1. UserModel(用户模块)
  -从Cookie中拿到用户数据.(需要解析?)
  -启动逻辑, 判断权限状态.

  -由WorkBookCtrl请求WorkBook源数据, set到WorkBookService中, 监听WorkBook变更事件.
  -WorkBook源数据回调后, 选择一项Sheet

#问题
后台源数据数据结构冗余, 过深.
dimensionVOLst > [hierarchical, isIndicator, needBeSearch] + searchUrl
> objLst > entity + childTree Orz
