import fetch from '@/common/js/fetch'

/**
 * 获取文章列表
 * @param {*} query
 */
export function getNewList (query) {
  return fetch({
    url: '/admin/new/list',
    method: 'get',
    params: query
  })
}