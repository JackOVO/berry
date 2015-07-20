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