import { Redirect } from 'react-router-dom'

import { message } from 'antd'

import FrameWork from '@/component/frame/frame-work/FrameWork'

import loginRouter from './login/login'

import homeRouter from './content/home'
import oneRouter from './content/one'


const routes = [
  {  //重定向
    path: '/', //一旦匹配到是这个路径 就会执行render函数
    exact: true,
    render: () => {
      //跳转到这个路径
      return <Redirect to="/login" />
    }
  },

  ...loginRouter,

  {
    path: '/content',
    render: ({ route }) => {
      if (localStorage.getItem('token')) {
        return <route.component route={route}></route.component>
      } else {
        message.warning('请先登录')
        return <Redirect to="/login" />
      }
    },
    component: FrameWork,
    routes: [
      {  // 重定向
        path: '/content', // 一旦匹配到是这个路径 就会执行render函数
        exact: true,
        render: () => {
          // 跳转到这个路径
          return <Redirect to="/content/home" />
        }
      },

      ...homeRouter,
      ...oneRouter
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