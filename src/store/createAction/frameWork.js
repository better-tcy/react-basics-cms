import { Map } from 'immutable'

import * as types from '../const/frameWork'

// 重置redux frameWork state数据
export const resetFrameWorkStateA = (state) => {
  return {
    type: types.RESET_FRAMEWORK_STATE,
    state: Map(state),
  }
}

export const setCurrentOneMenuPathA = (currentOneMenuPath) => {
  return {
    type: types.SET_CURRENT_ONE_MENU_PATH,
    currentOneMenuPath,
  }
}

export const setCurrentTwoMenuPathA = (currentTwoMenuPath) => {
  return {
    type: types.SET_CURRENT_TWO_MENU_PATH,
    currentTwoMenuPath,
  }
}

export const setMenuDataA = (menuData) => {
  return {
    type: types.SET_MENU_DATA,
    menuData,
  }
}

// 设置一维数组（导航） 登录拿到token后 访问某个path 判断是否有权限时会用到
export const setMenuPathArrA = (menuPathArr) => {
  return {
    type: types.SET_MENU_PATH_ARR,
    menuPathArr,
  }
}
