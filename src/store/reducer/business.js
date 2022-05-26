import { Map } from 'immutable'

import { SET_COMMON_DATA_ONE } from '../const/business'

const defaultReducer = Map({
  commonDataOneR: '',
})

function reducer(state = defaultReducer, action) {
  switch (action.type) {
    case SET_COMMON_DATA_ONE:
      return state.set('commonDataOneR', action.commonDataOne)
    default:
      return state
  }
}

export default reducer
