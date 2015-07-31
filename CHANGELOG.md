# v0.0.2 用户模块 2015/07/20
## 【增加】
 - index.js 定义ui.router路由配置, 启动逻辑初始化userService.
 - **Sass:** 大部分样式[sass/*] 
 - **核心模块:** [core.module, data.service, error.service]
  - coreCF 提供全局常量.
  - dataService 提供了对服务器, Cookie, LocalStoage, seesionStoage读写操作, 服务器错误状态处理.
  - errorService 对服务器错误消息的拦截处理, 以及业务错误未登录, 无权限的处理.
 - **用户模块:** [user.module, user.service, user.factory]
  - userFactory 将源数据解析成用户对象.
  - userService 对获取用户方法封装, 和用户服务初始化.

# v0.0.2 用户模块 2015/07/20
## 【增加】
 - bower.json 跟新至维度调整所需的所有依赖模块.
 - **核心模块:**
  - 添加登陆请求地址映射.
 - **用户模块:**
  - 添加登录页面login.html.
  - 为userService添加登陆方法.
  - 添加LoginCtrl, 执行登录, 错误输出.
 - **错误模块:**
  - 添加依赖模块ngDialog(对话框指令). 

# v0.0.3 用户模块 2015/07/20
## 【增加】
 - **核心模块:**
  - 添加储存初始化维度数据的Cookie的key常量.
 - **用户模块:**
  - 为userService增加获取Cookie存储的维度数据getDimeByCookie()方法.
  - 为userService添加获取指定用户Local数据getLocalRecord(userId)方法.
  - 为userService添加设置指定用户Local数据setLocalRecord(k, v)方法.
  - 为User类添加新增记录项addRecordItem(k, v)方法.

## 【修改】
 - **错误模块:**
  - 未登录错误时打开登录界面.
 - **用户模块:**
  - 変更getUser方法为getSessionUser,即获取服务器会话用户.

# v0.0.4 工作簿模块 2015/07/21
## 【增加】
 - **核心模块:**
  - 添加layout.html布局页面, 并绑定到home的路由页面.
  - 在用户初始化之后, 根据记录初始化工作簿.
 - **错误模块:**
  - 对强制弹出登录对话框的关闭回调处理.
 - **工作簿模块:**[workbook.module, workbook.service, workbook.factory]
  - workbookFactory 源数据解析成工作簿对象, 其中工作表的解析由工作簿类工厂完成.
  - workbookService 主要提供对工作表的操作, 同步, 新增, 关闭等.
 - **条件模块:**[condition.module, gundam.factory]
  - gundamFactory 可创建选中维度条件类, 供后台提供以及同步判断等.

# v0.0.5 工作簿模块 2015/07/23
## 【增加】
 - **静态资源**
  - 添加合并的图标.
 - **工作表模块**
  - sheetFactory 可将源数据解析成表对象, 记录工作表的记录.
  - sheetService 维护选中工作表数据, 提供更新表操作, 服务初始化方法.
 - **工作簿模块**
  - WorkBookCtrl 展现数据支持, 监听工作簿工作簿更新事件.
  - 把WorkBookCtrl绑定到根元素上, 别名为wb.
  - 在WorkBook类中添加选中表方法selected(index);
  - 在workbookService中包装selected方法, 级联通知sheetService更新表.
  - 在WorkBookCtrl中添加切换表接口toggle().
 - **用户模块**
  - 在用户服务初始化中, 拒绝空用户继续向上传递.

# v0.0.6 工作簿模块 2015/07/27
## 【增加】
  - **工作簿模块**
   - WorkBook类中添加移除表方法remove(index);
   - workbookService中包装remove方法, 并级联sheetService后台删除方法, 成功后重新选中表.
   - WorkBookCtrl 中添加删除表接口.
  - **工作表模块**
   - sheetFactory中添加异步关闭表的方法close(id).

# v0.0.7 工作表模块 2015/07/28
## 【增加】
  - **工作表模块**
   - 添加SheetCtrl控制器到布局页面layout.html中, 并注册监听表更新广播.
   - 在SheetCtrl添加加载完通知, 因为控制绑定的layout页面是异步加载的, 控制器可能会监听不到数据.
  - **表格模块**
   - tableFactory解析源数据创建成表格对象.
  - **指令模块**
   - handsontable指令, 视图指令, 负责显示表格数据, 渲染特殊单元格.
   - 添加通用渲染器, 单双行渲染器, 半个指标渲染器.

# v0.0.8 条件容器模块 2015/07/30
## 【增加】
  - **条件模块**
   - conditionFactory 解析源数据创建一个条件对象, 顺序, 方向, 维度.
  - **维度模块**
   - dimensionFactory 解析源数据创建一个维度对象, 名字, 树.
   - dimensionFactory 在维度类上添加press方法, 得到选中的对象解析.
  - **树模块**
   - treeFactory 解析源数据创建树对象, 提供遍历, 选中等类方法.

# v0.0.9 手风琴显示 2015/07/31
## 【增加】
  - conditionService 维护选中的条件对象, 提供业务方法.