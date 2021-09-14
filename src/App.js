import React, { memo } from 'react';

// 通过Provider把store共享出去
import { Provider } from 'react-redux'
import store from '@/store'

import {
  HashRouter,
} from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from '@/router/index'

import { setStoreData, getDataMergeState } from '@/utils/storageStateData'

const App = memo(() => {


  // 监听浏览器刷新 缓存部分redux数据
  setStoreData()

  // 获取缓存中的数据 并保存到redux中
  getDataMergeState()

  return (
    <Provider store={store}>
      <HashRouter>
        {renderRoutes(routes)}
      </HashRouter>
    </Provider>
  );
});

export default App;