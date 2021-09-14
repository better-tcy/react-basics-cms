import { Map } from 'immutable'

import { RESET_FRAMEWORK_STATE, SET_CURRENT_ONE_MENU_PATH, SET_CURRENT_TWO_MENU_PATH } from '../const/frameWork.js'


const defaultState = Map({
  currentOneMenuPathR: '',
  currentTwoMenuPathR: ''
})

function reducer(state = defaultState, action) {
  switch (action.type) {
    case RESET_FRAMEWORK_STATE:
      return action.state
    case SET_CURRENT_ONE_MENU_PATH:
      return state.set('currentOneMenuPathR', action.currentOneMenuPath)
    case SET_CURRENT_TWO_MENU_PATH:
      return state.set('currentTwoMenuPathR', action.currentTwoMenuPath)
    default:
      return state
  }
}

export default reducer