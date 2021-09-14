
import { getCommonDataOneH } from '@/request/api/content/home/home'

import '@/assets/api/business'; // 引入mock文件

import { getCommonDataOneA } from '../createAction/business'

// redux-thunk中定义的action函数
// 传入的这个函数 会被内部主动的调用 并且会传过来一个dispatch 这个dispatch就是我们store里的dispatch
// 这个getState 就是store里的getState
export const getCommonDataOneM = (dispatch, getState) => {
  // console.log('执行redux-thunk中间件', dispatch, getState)

  getCommonDataOneH().then(res => {
    console.log('mockjs返回的数据', res);
    dispatch(getCommonDataOneA(res.result))
  })
}
