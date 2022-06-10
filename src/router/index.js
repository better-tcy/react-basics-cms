import { Redirect } from 'react-router-dom'

import store from '@/store'

import { authenticationPathFun } from '@/utils/global'

import FrameWork from '@/component/frame/frame-work/FrameWork'

import loginRouter from './login/login'

import homeRouter from './content/home'
import oneRouter from './content/one'
import notFoundRouter from './content/not-found'

const routes = [
  {
    // 重定向 一旦匹配到是这个路径 就会执行render函数
    path: '/',
    exact: true,
    render: () => {
      //跳转到这个路径
      return <Redirect to="/login" />
    }
  },

  ...loginRouter,

  {
    path: '/content',
    render: ({ route, location }) => {
      return authenticationPathFun(route, location)
    },
    component: FrameWork,
    routes: [
      {
        path: '/content',
        exact: true,
        render: () => {
          const state = store.getState()
          const redirectPath = state.get('frameWork').get('currentTwoMenuPathR')
          return <Redirect to={redirectPath} />
        }
      },

      ...homeRouter,
      ...oneRouter,
      ...notFoundRouter
    ]
  },

  {
    path: '**',
    render: () => {
      return <Redirect to="/login" />
    }
  }
]

export default routes
