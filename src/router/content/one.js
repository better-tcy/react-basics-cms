import { lazy } from 'react';

const One = lazy(() => import('@/view/content/one/OneOne'))

const oneRouter = [
  {
    path: '/content/one/one',
    component: One
  }
]

export default oneRouter