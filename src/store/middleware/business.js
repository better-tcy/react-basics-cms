
import { getCommonDataOneH } from '@/request/api/content/home/home'

import { getCommonDataOneA } from '../createAction/business'

export const getCommonDataOneM = (dispatch, getState) => {
  getCommonDataOneH().then(res => {
    dispatch(getCommonDataOneA(res.result))
  })
}
