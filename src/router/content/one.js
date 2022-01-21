import { lazy } from 'react';

const One = lazy(() => import('@/view/content/one/OneOne'))

const oneRouter = [
  {
    path: '/content/one/One',
    exact: true,
    component: One
  }
]

export default oneRouter