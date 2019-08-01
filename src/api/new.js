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

/**
 * 添加文章
 * @param {*} query
 */
export function newAdd (query) {
  return fetch({
    url: '/admin/new/add',
    method: 'post',
    data: query
  })
}

/**
 * 修改文章
 * @param {*} query
 */
export function newUpdate (query) {
  return fetch({
    url: '/admin/new/update',
    method: 'post',
    data: query
  })
}

/**
 * 获取文章
 * @param {*} query
 */
export function newGetInfo (query) {
  return fetch({
    url: '/admin/new/info',
    method: 'get',
    params: query
  })
}