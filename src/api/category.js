import fetch from '@/common/js/fetch'

/**
 * 获取分类列表
 * @param {*} query
 */
export function getCategoryList (query) {
  return fetch({
    url: '/admin/category/list',
    method: 'get',
    params: query
  })
}

/**
 * 分类添加
 * @param {*} query 
 */
export function createCategory (query) {
  return fetch({
    url: '/admin/category/add',
    method: 'post',
    data: query
  })
}

/**
 * 分类添加
 * @param {*} query 
 */
export function updateCategory (query) {
  return fetch({
    url: '/admin/category/update',
    method: 'post',
    data: query
  })
}

/**
 * 分类添加
 * @param {*} query 
 */
export function getCategoryInfo (query) {
  return fetch({
    url: '/admin/category/info',
    method: 'get',
    params: query
  })
}

/**
 * 全部分类
 * @param {*} query 
 */
export function getCategoryAll (query) {
  return fetch({
    url: '/admin/category/get/all',
    method: 'get',
    params: query
  })
}