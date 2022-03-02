import { getQuery } from '@/request/http.js'

export function getCommonDataOneH(params) {
  return getQuery('/commonData', params)
}
