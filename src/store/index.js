import {
  createStore,
  applyMiddleware // applyMiddleware应用中间件
} from 'redux'

import thunkMiddleware from 'redux-thunk'

// 安装redux-devtools-extension的可视化工具。
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from './reducer'

// 应用一些中间件 也可以多个中间件进行合并 返回一个enhancer
const storeenhancer = applyMiddleware(thunkMiddleware)

// 创建store
const store = createStore(reducer, composeWithDevTools(storeenhancer))
// thunkMiddleware这个中间件 已经被应用到store里面了
// dispatch可以派发一个函数了 在这个函数里面可以进行网络请求 然后把返回的数据 放在action里面 然后再次进行dispatch
// 这样网络请求就不是依赖组件了 而是在store中完成了

export default store
