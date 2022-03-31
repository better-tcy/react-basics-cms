import { getQuery } from '@/request/http'

export function getTableDataH(params) {
  return getQuery('/page/', params)
}
