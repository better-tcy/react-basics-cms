import { Redirect } from 'react-router-dom'

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
]

export default routes