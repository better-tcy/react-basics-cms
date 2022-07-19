import { getCommonDataH } from '@/request/api/content/other/use-redux-middleware'

import { setCommonDataOneA } from '../createAction/business'

export const getCommonDataOneM = (dispatch, getState) => {
  getCommonDataH().then((res) => {
    dispatch(setCommonDataOneA(res.data))
  })
}
