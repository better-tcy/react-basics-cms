import { lazy } from 'react'

const UsePage = lazy(() => import('@/view/content/use-components/use-page/UsePage'))
const UsePageSearch = lazy(() =>
  import('@/view/content/use-components/use-page-search/UsePageSearch')
)
const UsePageModal = lazy(() => import('@/view/content/use-components/use-page-model/UsePageModal'))

const useComponentsRouter = [
  {
    path: '/content/use-components/UsePage',
    exact: true,
    component: UsePage
  },
  {
    path: '/content/use-components/UsePageSearch',
    exact: true,
    component: UsePageSearch
  },
  {
    path: '/content/use-components/UsePageModal',
    exact: true,
    component: UsePageModal
  }
]

export default useComponentsRouter
