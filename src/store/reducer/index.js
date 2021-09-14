// 这个函数可以把state对象也转成imutable对象
import { combineReducers } from 'redux-immutable'

import frameWorkReducer from './frameWork'
import businessReducer from './business'

// 合并多个reducer 第一次编译combineReducers的时候传入的state是一个空对象
const allReducer = combineReducers({
  frameWork: frameWorkReducer, // frameWork本质上是一个immutable对象了
  business: businessReducer
})

export default allReducer