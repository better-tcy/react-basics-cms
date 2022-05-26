import { getCommonDataOneH } from '@/request/api/content/home/home'

import { setCommonDataOneA } from '../createAction/business'

export const getCommonDataOneM = (dispatch, getState) => {
  getCommonDataOneH().then((res) => {
    dispatch(setCommonDataOneA(res.data))
  })
}
