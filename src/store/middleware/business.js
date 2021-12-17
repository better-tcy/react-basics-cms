
import { getCommonDataOneH } from '@/request/api/content/home/home'

import '@/assets/api/business'; // 引入mock文件

import { getCommonDataOneA } from '../createAction/business'

export const getCommonDataOneM = (dispatch, getState) => {
  getCommonDataOneH().then(res => {
    dispatch(getCommonDataOneA(res.result))
  })
}
