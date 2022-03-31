文档

## 一.说明

这是一个基于 create-react-app 4.0.3(react 17.0.2)搭建的一个 cms 基础模板，集成 mock.js 模拟接口，集成配置生成页面功能（view->content->one->one-one-OneOne.js 中查看，文档地址：' https://betteryourself-tcy.github.io/json-page-markdown/ '），全程使用 hooks 函数式组件，redux + redux-thunk 统一管理数据的开发模式(页面内所需数据直接在页面内进行请求和操作即可，如果是公共数据 可以使用中间件保存到 redux 中)，集成异常监控功能（基于 sentry），另外可以在 src->assets->data->themeConfig.js 或者 craco.config.js 中定制项目主题 :rainbow:

**模板在线展示地址：http://101.43.153.100/login**

## 二.目录

### 1.public:静态资源文件夹

### 2.src:项目资源

- assets:项目资源(mock 模拟接口,css 初始化,模拟导航数据,图片)
- components:组件(页面公共组件,cms 框架组件)
- request:网络请求(api 文件夹:接口统一维护,http.js:基于 axios 封装的网络请求)
- router:路由(index.js 主路由,content 中每个文件对应的是每个一级菜单下所有的路由)
- store:redux 统一数据管理
- utils:工具文件夹(持久化 redux state,页面公共方法)
- view:项目所有页面(content 文件中最外层为一级菜单,依次延伸 最后一层.js 文件为具体页面)
- APP.js:项目主组件
- index.js:项目入口文件

### 3.env:对应模式的环境变量(开发,测试,生产)

### 4.package-lock.json:项目具体所依赖的库 插件等

### 5.craco.config.js:对 webpack 以及 serve 的一些配置

## 三.目录设计思路及个人开发规范

1. 除 store 文件夹外 所有文件夹使用 - 分割 方式命名 例:frame-work
2. 路由 path 一级以 - 分割命名 二级以大驼峰命名
3. 所有具体组件使用大驼峰命名
4. 变量 函数 文件名 使用小驼峰命名
5. 图片 样式 class 以 cms_name 格式命名
6. 解耦 request router redux(middleware action reducer)
7. view 和 request 目录结构一一对应(层级明了)
8. router 目录中 index.js 主路由,content 中每个文件对应的是每个一级菜单下所有的路由
9. store 中 frameWork 文件是操作及保存框架所需公共数据的 business 文件是操作及保存业务所需公共数据的
10. 普通函数、接口函数、中间件、派发函数、reducer 数据、组件名称等大写字母结尾含义:Fun:普通函数或方法 H:请求接口函数 M:中间件 A:派发 action 函数 R:reducer 数据 C:模块内公共组件
11. 编写组件从上到下结构顺序：

- 1.获取 props 数据
- 2.用 useImperativeHandle 暴露一些外部 ref 能访问的属性
- 3.声明 history 及 dispatch
- 4 获取所用到的全局数据(缓存，redux，context 等)
- 5.定义 useRef 及 useState 数据(按照页面所需数据从上到下顺序定义)
- 6.其他 let 及 const 变量(按照页面所需数据从上到下顺序定义，函数也同样)
- 7.定义页面所需函数(页面公共函数 放到函数区最开始，例如 getTableData 函数;如果上述 let 或 const 变量是个对象，且对象中使用到函数了，则函数使用函数声明方式来定义函数 例：function foo(){})
- 8.useEffect()
- 9.jsx 代码

## 四.git 提交

提交代码需要使用 `npm run commit | yarn commit`：

- 第一步是选择 type，本次更新的类型

| Type     | 作用                                                                                   |
| -------- | -------------------------------------------------------------------------------------- |
| feat     | 新增特性 (feature)                                                                     |
| fix      | 修复 Bug(bug fix)                                                                      |
| docs     | 修改文档 (documentation)                                                               |
| style    | 代码格式修改(white-space, formatting, missing semi colons, etc)                        |
| refactor | 代码重构(refactor)                                                                     |
| perf     | 改善性能(A code change that improves performance)                                      |
| test     | 测试(when adding missing tests)                                                        |
| build    | 变更项目构建或外部依赖（例如 scopes: webpack、gulp、npm 等）                           |
| ci       | 更改持续集成软件的配置文件和 package 中的 scripts 命令，例如 scopes: Travis, Circle 等 |
| chore    | 变更构建流程或辅助工具(比如更改测试环境)                                               |
| revert   | 代码回退                                                                               |

- 第二步选择本次修改的范围（作用域）

![image-two](https://github.com/Betteryourself-tcy/images/blob/master/two.png?raw=true)

- 第三步选择提交的信息

![image-three](https://github.com/Betteryourself-tcy/images/blob/master/three.png?raw=true)

- 第四步提交详细的描述信息

![image-four](https://github.com/Betteryourself-tcy/images/blob/master/four.png?raw=true)

- 第五步是否是一次重大的更改

![image-five](https://github.com/Betteryourself-tcy/images/blob/master/five.png?raw=true)

- 第六步是否影响某个 open issue

![image-six](https://github.com/Betteryourself-tcy/images/blob/master/six.png?raw=true)

#### ps:页面渲染内容虽然不多 但是可以参考下整体代码设计 欢迎提出问题 共同进步
