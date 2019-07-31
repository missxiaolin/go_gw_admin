import fetch from '@/common/js/fetch'

/**
 * 登录
 * @param {*} query
 */
export function getCategoryList (query) {
  return fetch({
    url: '/admin/category/list',
    method: 'post',
    data: query
  })
}