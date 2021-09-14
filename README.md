文档

## 一.说明

这是一个基于create-react-app 4.0.3(react 17.0.2)搭建的一个cms基础模板,集成mock.js模拟接口,全程使用hooks函数式组件
redux + redux-thunk统一管理数据的开发模式(页面内所需数据直接在页面内进行请求和操作即可,如果是公共数据 可以使用中间件保存到redux中)
 
## 二.目录

### 1.public:静态资源文件夹

### 2.src:项目资源

* assets:项目资源(mock模拟接口,css初始化,模拟导航数据)
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
1. 所有组件使用大驼峰命名
2. 变量函数使用小驼峰命名
3. 图片 样式class 以cms_name格式命名
4. 解耦request router redux(middleware action reducer)
5. view和request目录结构一一对应(层级明了)
6. router目录中index.js主路由,content中每个文件对应的是每个一级菜单下所有的路由
7. store中 frameWork文件是操作及保存框架所需公共数据的 business文件是操作及保存业务所需公共数据的
8. 函数、变量、文件名称等大写字母结尾含义:H:请求接口函数 C:页面内封装的组件 A:派发action函数 M:中间件 R:reducer数据

#### ps:页面渲染内容虽然不多 但是可以参考下整体代码设计 欢迎提出问题 共同进步 
