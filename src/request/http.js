import axios from 'axios'

import { message } from 'antd'

import store from '@/store'

import {
  setCurrentOneMenuPathA,
  setCurrentTwoMenuPathA,
  setMenuDataA
} from '@/store/createAction/frameWork.js'

// 创建axios实例
const axios1 = axios.create()

axios1.defaults.baseURL = process.env.REACT_APP_REQUEST_BASE_URL

axios1.defaults.timeout = 10000
axios1.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8;multipart/form-data'

// 请求拦截器
axios1.interceptors.request.use(
  (config) => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = localStorage.getItem('token')

    token && (config.headers.token = token)
    return config
  },
  (error) => {
    return Promise.error(error)
  }
)

// 响应拦截器 code只是案例 具体code结合后端来定
axios1.interceptors.response.use(
  (response) => {
    // 网络层200
    if (response.status === 200) {
      switch (response.data.code) {
        // 成功
        case 0:
          return Promise.resolve(response)

        // 账号或密码错误
        case 500:
          return Promise.reject(response.data.msg)

        // token失效
        case 401:
          localStorage.clear()
          store.dispatch(setCurrentTwoMenuPathA('/content/home'))
          store.dispatch(setCurrentOneMenuPathA(''))
          store.dispatch(setMenuDataA([]))

          setTimeout(() => {
            window.location.replace(`/login`)
          }, 1000)

          return Promise.reject(response.data.msg)

        // 其他非0状态
        default:
          if (response.data.code) {
            // 其他错误
            return Promise.reject(response.data.msg)
          }
      }
    }
  },
  // 网络层状态码不是200的情况
  (error) => {
    if (error) {
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
    axios1
      .get(url, {
        params
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err = '网络出错') => {
        message.error(err)
        reject(err)
      })
  })
}

/**
 * get方法，对应get请求 params
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function getParams(url, params) {
  const { id } = params
  return new Promise((resolve, reject) => {
    axios1
      .get(`${url}${id}`)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err = '网络出错') => {
        message.error(err)
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
    axios1
      .post(url, params)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err = '网络出错') => {
        message.error(err)
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
  const id = params.id
  if (id) {
    url = `${url}${id}`
    delete params.id
  }
  return new Promise((resolve, reject) => {
    axios1
      .put(url, params)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err = '网络出错') => {
        message.error(err)
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
  const id = params.id
  if (id) {
    url = `${url}${id}`
    delete params.id
  }

  return new Promise((resolve, reject) => {
    axios1
      .delete(url, {
        data: Object.keys(params).length !== 0 ? params : null
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err = '网络出错') => {
        message.error(err)
        reject(err)
      })
  })
}
