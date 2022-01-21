import { Redirect } from 'react-router-dom'

import { message } from 'antd'

import store from '@/store'

export function authenticationPath(route, location) {
  const state = store.getState();
  const menuPathArr = state.get('frameWork').get('menuPathArrR')

  if (localStorage.getItem('token')) {

    if (location.pathname === '/content') {
      return <route.component route={route}></route.component>
    }

    let isToPage = false

    let routeItem = route.routes.find(item => item.path === location.pathname)
    if (routeItem && routeItem.allowAccess) {
      isToPage = true
    } else {
      for (let itemPath of menuPathArr) {
        if (location.pathname === itemPath) {
          isToPage = true
          break
        }
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