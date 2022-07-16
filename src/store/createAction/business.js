import * as types from '../const/business'

export function setCommonDataOneA(commonDataOne) {
  return {
    type: types.SET_COMMON_DATA_ONE,
    commonDataOne
  }
}
