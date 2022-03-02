import { getQuery, remove, post, getRestful, put } from '@/request/http.js'

export function getTableDataH(url, params) {
  return getQuery(url, params)
}

export function removeTableDataH(url, params) {
  return remove(url, params)
}

export function startTableDataH(url, params) {
  return post(url, params)
}

export function stopTableDataH(url, params) {
  return post(url, params)
}

export function addTableDataItemH(url, params) {
  return post(url, params)
}

export function getTableDataItemDetailsH(url, params) {
  return getRestful(url, params)
}

export function updateTableDataItemH(url, params) {
  return put(url, params)
}


