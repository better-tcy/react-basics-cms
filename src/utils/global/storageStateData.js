import store from '@/store'
import { resetFrameWorkStateA } from '@/store/createAction/frameWork'

export function setStoreData() {
  // 在页面刷新时将redux里的部分信息保存到sessionStorage里
  window.addEventListener('beforeunload', () => {
    const state = store.getState()
    sessionStorage.setItem(
      'frameWorkState',
      JSON.stringify({
        currentOneMenuPathR: state.get('frameWork').get('currentOneMenuPathR'),
        currentTwoMenuPathR: state.get('frameWork').get('currentTwoMenuPathR'),
        menuDataR: state.get('frameWork').get('menuDataR'),
        menuPathArrR: state.get('frameWork').get('menuPathArrR')
      })
    )
  })
}

//获取缓存数据 合并redux frameWork state数据
export function getDataMergeState() {
  if (sessionStorage.getItem('frameWorkState')) {
    store.dispatch(
      resetFrameWorkStateA({
        ...store.getState().get('frameWork'),
        ...JSON.parse(sessionStorage.getItem('frameWorkState'))
      })
    )

    sessionStorage.clear()
  }
}
