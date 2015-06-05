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
  -核心依赖脚本加载完毕, 模板渲染完毕后, 以用户模块为启动点.
  1. UserModel(用户模块)
  -从Cookie中拿到用户数据(需要解析?), 用户服务初始化(请求userInfo, 广播)
  -根据用户的信息判断, 继续初始化还是中断跳转到登陆事件流中.
  3. WorkBook(工作簿模块)
  -从条件模块的初始化中拿到初始化参数对象, 进行数据的请求操作.
  -由WorkBookCtrl请求WorkBook源数据, set到WorkBookService中, 监听WorkBook变更事件.
  -WorkBook源数据回调后, 处理源数据返回, 广播WorkBook改变, 选中一项Sheet, 并广播.
  2. Condition(条件模块) 形态:[选中对象 -> 条件对象 -> 参数对象]
  -从Cookie中取得跨域条件, 转换并导入到LocalStorage中, 并set同步属性.
  4. Sheet(工作表模块)
  -通过控制器监听的NowSheet变更事件来set到SheetService中.
  -通过跟新选中的表方法, 广播通知条件服务以及表格服务, 当前的数据有变更.

#问题
后台源数据数据结构冗余, 过深.
dimensionVOLst > [hierarchical, isIndicator, needBeSearch] + searchUrl
> objLst > entity + childTree Orz
