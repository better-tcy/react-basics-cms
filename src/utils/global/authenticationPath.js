import { Redirect } from 'react-router-dom'

import { message } from 'antd'

import store from '@/store'

export function authenticationPath(route, location) {
  const state = store.getState();
  const menuPathArr = state.get('frameWork').get('menuPathArrR')

  if (localStorage.getItem('token')) {
    let isToPage = false
    for (let itemPath of menuPathArr) {
      if (location.pathname === itemPath || location.pathname === '/content' || location.pathname === '/content/not-found') {
        isToPage = true
        break
      }
    }

    if (isToPage) {
      return <route.component route={route}></route.component>
    } else {
      return <Redirect to="/content/not-found" />
    }

  } else {
    message.warning('请先登录')
    return <Redirect to="/login" />
  }
}