import { lazy } from 'react'

const OneOne = lazy(() => import('@/view/content/one/one-one/OneOne'))
const OneTwo = lazy(() => import('@/view/content/one/one-two/OneTwo'))

const oneRouter = [
  {
    path: '/content/one/OneOne',
    exact: true,
    component: OneOne
  },
  {
    path: '/content/one/OneTwo',
    exact: true,
    component: OneTwo
  }
]

export default oneRouter
