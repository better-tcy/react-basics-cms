import { getQuery } from '@/request/http.js'

export function getCommonDataH(params) {
  return getQuery('/commonData/', params)
}
