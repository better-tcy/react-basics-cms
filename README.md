文档

## 一.说明

这是一个基于create-react-app 4.0.3(react 17.0.2)搭建的一个cms基础模板，集成mock.js模拟接口，全程使用hooks函数式组件，redux + redux-thunk统一管理数据的开发模式(页面内所需数据直接在页面内进行请求和操作即可，如果是公共数据 可以使用中间件保存到redux中)，集成异常监控功能（基于sentry），另外可以在src->assets->data->themeConfig.js或者craco.config.js中定制项目主题。
 
## 二.目录

### 1.public:静态资源文件夹

### 2.src:项目资源

* assets:项目资源(mock模拟接口,css初始化,模拟导航数据,图片)
* components:组件(页面公共组件,cms框架组件)
* request:网络请求(api文件夹:接口统一维护,http.js:基于axios封装的网络请求)
* router:路由(index.js主路由,content中每个文件对应的是每个一级菜单下所有的路由)
* store:redux统一数据管理
* utils:工具文件夹(持久化redux state,页面公共方法)
* view:项目所有页面(content文件中最外层为一级菜单,依次延伸 最后一层.js文件为具体页面)
* APP.js:项目主组件
* index.js:项目入口文件

### 3.env:对应模式的环境变量(开发,测试,生产)

### 4.package-lock.json:项目具体所依赖的库 插件等

### 5.craco.config.js:对webpack以及serve的一些配置

## 三.目录设计思路及个人开发规范
1. 除store文件夹外 所有文件夹使用 - 分割 方式命名 例:frame-work
2. 路由path 一级以 - 分割命名 二级以大驼峰命名
3. 所有具体组件使用大驼峰命名
4. 变量 函数 文件名 使用小驼峰命名
5. 图片 样式class 以cms_name格式命名
6. 解耦request router redux(middleware action reducer)
7. view和request目录结构一一对应(层级明了)
8. router目录中index.js主路由,content中每个文件对应的是每个一级菜单下所有的路由
9. store中 frameWork文件是操作及保存框架所需公共数据的 business文件是操作及保存业务所需公共数据的
10. 函数、变量、文件名称等大写字母结尾含义:H:请求接口函数 A:派发action函数 M:中间件 R:reducer数据
11. 编写组件从上到下结构顺序：
  * 1.获取props数据
  * 2.声明history及dispatch
  * 3.获取所用到的全局数据（缓存，redux，context等）
  * 4.定义useRef及useState数据
  * 5.其他let及const变量
  * 6.定义页面所需函数
  * 7.jsx代码

#### ps:页面渲染内容虽然不多 但是可以参考下整体代码设计 欢迎提出问题 共同进步 
