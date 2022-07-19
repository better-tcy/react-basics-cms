import { lazy } from 'react'

const Home = lazy(() => import('@/view/content/home/Home'))

const homeRouter = [
  {
    path: '/content/home',
    exact: true,
    component: Home
  }
]

export default homeRouter
