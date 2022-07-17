import { lazy } from 'react'

const UseRudexMiddleware = lazy(() =>
  import('@/view/content/other/use-redux-middleware/UseRudexMiddleware')
)
const Test = lazy(() => import('@/view/content/other/use-redux-middleware/children/test/Test'))
const Resource = lazy(() => import('@/view/content/other/resource/Resource'))

const otherRouter = [
  {
    path: '/content/other/UseRudexMiddleware',
    exact: true,
    component: UseRudexMiddleware
  },
  {
    path: '/content/other/use-redux-middleware/children/Test',
    exact: true,
    component: Test,
    // 是否有token后就可以访问的页面 （和导航权限无关的页面）
    allowAccess: true
  },
  {
    path: '/content/other/Resource',
    exact: true,
    component: Resource
  }
]

export default otherRouter
