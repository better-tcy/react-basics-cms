## 一.说明

#### 这是一个基于 create-react-app 4.0.3(react 17.0.2)搭建的 CMS 基础模板 :rainbow:

1. 全程使用 hooks 函数式组件
2. redux + redux-thunk 全局状态管理
3. 定制项目主题（src->assets->data->themeConfig.js 或者 craco.config.js）
4. mock.js 模拟接口
5. 异常监控功能（基于 sentry）
6. 配置生成页面（OneOne.js 组件中查看，文档地址：https://betteryourself-tcy.github.io/json-page-markdown/ ）

- 传入配置即可生成一套基础页面（增 删 改 查 启用 停用）
- 组件自动校验传入配置项是否正确
- 页面上所渲染的功能都可灵活配置
- 根据权限动态渲染按钮
- 根据业务需求自定义表格及页面按钮
- 支持搜索区域多个下拉框联动功能

**模板在线展示地址：http://101.43.153.100/login**

## 二.目录

#### 1 .husky：git 提交钩子配置

#### 2 public：静态资源文件夹

#### 3 src：项目资源

- assets：项目资源(mock 模拟接口,css 初始化,模拟导航数据,项目使用图片)
- components：组件(页面公共组件,cms 框架组件)
- request：网络请求(api 文件夹：接口统一维护，http.js：基于 axios 封装的网络请求)
- router：路由(index.js 主路由，content 中每个文件对应的是每个一级菜单下所有的路由)
- store：redux 统一数据管理
- utils：工具文件夹(业务工具，框架层工具)
- view：项目所有页面(content 文件中最外层为一级菜单，依次延伸 最后一层.js 文件为具体页面)
- Appjs：项目主组件
- index.js：项目入口文件

#### 4 .editorconfig：设置多个编辑器统一编码风格

#### 5 .env：对应模式的环境变量（开发 生产）

#### 6 .eslintrc：ellint 配置

#### 7 .gitignore：使用 git 推送到远程存储库时忽略的所有文件和文件夹的名称

#### 8 .prettierignore：使用 prettier 格式化时所忽略的文件

#### 9 .prettierrc：代码格式化配置

#### 10 commitlint.config.js：检测 git commit 提交规范

#### 11 .craco.config.js:对 webpack babel plugins 的一些配置

#### 12 package.json：当前项目的配置及依赖项

#### 13 README.md：项目文档

#### 14 yarn.lock：项目依赖的具体版本

## 三.目录设计思路及个人开发规范

1. 除 store 文件夹外 所有文件夹使用 - 分割 方式命名 例:frame-work
2. 路由 path 命名 一级以 - 分割命名 二级以大驼峰命名
3. 所有具体组件使用大驼峰命名
4. 变量 函数 文件名 使用小驼峰命名
5. 图片 样式 class 以 cms_name 格式命名
6. 使用 on 开头的形式作为 props 中用于回调的属性名称
7. 层级解耦 request router redux（middleware action reducer）
8. view 和 request 目录结构一一对应（层级明了）
9. router 目录中 index.js 为主路由，content 中每个文件对应的是每个一级菜单下所有的路由
10. store 下的每个 frameWork 文件是操作及保存框架所需公共数据的，每个 business 文件是操作及保存业务所需公共数据的
11. 大写字母结尾含义：

- Fun：普通函数或方法
- H：定义请求接口函数
- M：redux 中间件
- A：redux 派发 action 函数
- R：reducer 数据
- C：模块内公共组件

12. 编写组件从上到下结构顺序：

- 获取 props 数据
- 用 useImperativeHandle 暴露一些外部 ref 能访问的属性
- 获取所用到的全局数据(缓存，redux，context 等)
- 声明 history 及 dispatch
- 定义 useRef 及 useState 数据(第三方非 react 内部 hook 和自定义 hook 再最上面 其他按照页面所需数据从上到下顺序定义)
- 其他 let 及 const 变量(按照页面所需数据从上到下顺序定义，函数也同样)
- 定义页面所需函数(页面公共函数 放到函数区最开始，例如 getTableData 函数)
- useEffect()
- jsx 代码

## 四.git 提交规范

提交代码需要使用 `npm run commit | yarn commit`：

- 第一步是选择 type，本次更新的类型

| Type     | 作用                                                                                   |
| -------- | -------------------------------------------------------------------------------------- |
| feat     | 产品新功能（通常是能够让用户觉察到的变化）：大到新增模块 小到文案或样式调整                                                                    |
| fix      | 修复Bug                                                                   |
| docs     | 修改文档或注释                                                               |
| style    | 代码格式调整（空格缩进 尾随逗号等）：对逻辑无影响，比如按照 eslint prettierrc或团队风格修改代码格式（注意不是 UI 变更）                  |
| refactor | 重构（代码优化但不影响产品功能）：比如文件 变量重命名、优化代码设计、代码抽象为函数、消除魔法数字等                                                           |
| perf     | 改善性能 性能提升                                     |
| test     | 测试相关变更                                                 |
| build    | 变更项目构建或外部依赖：例如 webpack、gulp、npm 等                           |
| ci       | 更改持续集成软件的配置文件和 package 中的 scripts 命令|
| chore    | 杂项（其他无法归类的变更）：比如代码合并                         |
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

### ps:页面渲染内容虽然不多 但是可以参考下整体代码设计 欢迎提出问题 共同进步
