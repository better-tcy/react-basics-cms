import { lazy } from 'react'

const NotFound = lazy(() => import('@/view/content/not-found/NotFound'))

const notFoundRouter = [
  {
    path: '/content/not-found',
    exact: true,
    component: NotFound,
    // 是否有token后 就可以访问的页面
    allowAccess: true,
  },
]

export default notFoundRouter
