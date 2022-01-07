import { lazy } from 'react';

const NotFound = lazy(() => import('@/view/content/not-found/NotFound'))

const notFoundRouter = [
  {
    path: '/content/not-found',
    component: NotFound
  }
]

export default notFoundRouter