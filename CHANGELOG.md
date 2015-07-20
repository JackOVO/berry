# v0.0.2 八路 2015/07/20
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

# v0.0.2 八路 2015/07/20
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

## 【修改】
 - **错误模块:**
  - 未登录错误时打开登录界面.
 - **用户模块:**
  - 変更getUser方法为getSessionUser,即获取服务器会话用户.


