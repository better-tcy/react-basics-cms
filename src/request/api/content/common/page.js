import { getQuery, remove, post, getParams, put } from '@/request/http.js'

export function getTableDataH(url, params) {
  return getQuery(url, params)
}

export function removeTableItemDataH(url, params) {
  return remove(url, params)
}

export function startTableItemDataH(url, params) {
  return post(url, params)
}

export function stopTableItemDataH(url, params) {
  return post(url, params)
}

export function addTableItemDataH(url, params) {
  return post(url, params)
}

export function getTableItemDataDetailsH(url, params) {
  return getParams(url, params)
}

export function updateTableItemDataH(url, params) {
  return put(url, params)
}
