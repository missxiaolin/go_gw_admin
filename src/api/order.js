import fetch from '@/common/js/fetch'

/**
 * 列表
 * @param {*} query
 */
export function orderIndex (query) {
  return fetch({
    url: '/order/index',
    method: 'get',
    params: query
  })
}

/**
 * 详情
 * @param {*} query
 */
export function orderDetail (query) {
  return fetch({
    url: '/order/detail',
    method: 'get',
    params: query
  })
}
