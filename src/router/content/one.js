import { lazy } from 'react'

const One = lazy(() => import('@/view/content/one/one-one/OneOne'))

const oneRouter = [
  {
    path: '/content/one/OneOne',
    exact: true,
    component: One
  }
]

export default oneRouter
