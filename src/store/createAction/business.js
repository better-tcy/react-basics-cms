import * as types from '../const/business'

export function getCommonDataOneA(commonDataOne) {
  return {
    type: types.GET_COMMON_DATA_ONE,
    commonDataOne
  }
}
