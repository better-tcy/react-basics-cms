// 入口文件

import React from 'react'
import ReactDOM from 'react-dom'

import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

import App from './App'

import '@/assets/api/business' // 引入mock文件

// 样式初始化
import '@/assets/css/index.css'
import '@/assets/css/resetAntdStyle.css'

Sentry.init({
  dsn: '',
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
})

ReactDOM.render(<App />, document.getElementById('root'))
