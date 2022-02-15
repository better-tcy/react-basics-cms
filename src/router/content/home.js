import { lazy } from 'react';

const Home = lazy(() => import('@/view/content/home/Home'))

const Test = lazy(() => import('@/view/content/home/children/test/Test'))

const homeRouter = [
  {
    path: '/content/home',
    exact: true,
    component: Home,
  },
  {
    path: "/content/home/Test",
    exact: true,
    component: Test,
    // 是否有token后就可以访问的页面 （和导航权限无关的页面）
    allowAccess: true
  },
]

export default homeRouter