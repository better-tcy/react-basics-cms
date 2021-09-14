import axios from 'axios'

// 创建axios实例
const axios1 = axios.create()

// 环境的切换
if (process.env.NODE_ENV === 'development') {
  console.log('开发模式')
  axios1.defaults.baseURL = 'http://localhost:8080/'
} else if (process.env.NODE_ENV === 'test') {
  console.log('测试模式')
  axios1.defaults.baseURL = ''
} else if (process.env.NODE_ENV === 'production') {
  console.log('生产模式')
  axios1.defaults.baseURL = ''
}
axios1.defaults.timeout = 10000
axios1.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;multipart/form-data'

// 请求拦截器
axios1.interceptors.request.use(
  config => {
    console.log('请求拦截器触发')
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = localStorage.getItem('token')

    token && (config.headers.token = token)
    return config
  },
  error => {
    return Promise.error(error)
  })

// 响应拦截器 code只是案例 具体code结合后端来定
axios1.interceptors.response.use(
  (response) => {
    console.log('响应拦截器拦截的数据', response)
    // 网络层200
    if (response.status === 200) {
      switch (response.data.code) {
        // 成功
        case 0:
          return Promise.resolve(response)

        // 账号或密码错误
        case 500:
          // 弹窗提示错误
          return Promise.reject(response.data.msg)

        // 登录过期对用户进行提示
        // 清除本地token
        // 跳转登录页面
        case 401:
          // 弹窗提示
          // 清除token
          localStorage.removeItem('token')
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          return Promise.reject(response.data.msg)

        // 其他非0状态
        default:
          if (response.data.code) {
            // 其他错误
            // 弹窗提示错误
            return Promise.reject(response.data.msg)
          }
          // 防止后端接口返回正确数据 但是未返回状态码
          return Promise.resolve(response)
      }
    }
  },
  // 网络层状态码不是200的情况
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        // 404请求不存在
        case 404:
          // 弹窗提示错误
          break
        // 其他错误，直接抛出错误提示
        default:
        // 弹窗提示错误
      }
      return Promise.reject(error.response)
    }
  }
)

/**
 * get方法，对应get请求 query
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function getQuery(url, params) {
  return new Promise((resolve, reject) => {
    axios1.get(url, {
      params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      console.log('非0状态码', err)
      reject(err)
    })
  })
}

/**
 * get方法，对应get请求 restful
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function getRestful(url, params) {
  const {
    id
  } = params
  return new Promise((resolve, reject) => {
    axios1.get(`${url}/${id}`).then(res => {
      resolve(res.data)
    }).catch(err => {
      console.log('非0状态码', err)
      reject(err)
    })
  })
}

/**
 * get方法，对应get请求 (获取验证码图片)
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function getCodeImage(url, params) {
  return new Promise((resolve, reject) => {
    axios1.get(url, {
      params,
      responseType: 'blob'
    })
      .then(res => {
        resolve(res.data)
      }).catch(err => {
        console.log('非0状态码', err)
        reject(err)
      })
  })
}


/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios1.post(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        console.log('非0状态码', err)
        reject(err)
      })
  })
}

/**
 * put方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function put(url, params) {
  return new Promise((resolve, reject) => {
    axios1.put(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        console.log('非0状态码', err)
        reject(err)
      })
  })
}

/**
 * delete方法，对应delete请求 
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function remove(url, params) {
  return new Promise((resolve, reject) => {
    axios1.delete(url, {
      params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      console.log('非0状态码', err)
      reject(err)
    })
  })
}