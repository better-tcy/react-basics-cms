import React, { memo, createContext } from 'react'

import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import 'moment/locale/zh-cn'

// 通过Provider把store共享出去
import { Provider } from 'react-redux'
import store from '@/store'

import { BrowserRouter } from 'react-router-dom'

import { renderRoutes } from 'react-router-config'
import routes from '@/router/index'

import { setStoreData, getDataMergeState } from '@/utils/global'

import themeConfig from '@/assets/data/themeConfig'

export const ThemeContext = createContext()

const App = memo(() => {
  // 监听浏览器刷新 缓存部分redux数据
  setStoreData()

  // 获取缓存中的数据 并保存到redux中
  getDataMergeState()

  return (
    <ConfigProvider locale={zhCN}>
      <ThemeContext.Provider value={themeConfig}>
        <Provider store={store}>
          <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
        </Provider>
      </ThemeContext.Provider>
    </ConfigProvider>
  )
})

export default App
