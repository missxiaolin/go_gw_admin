import fetch from '@/common/js/fetch'

/**
 * 登录
 * @param {*} query
 */
export function login (query) {
  return fetch({
    url: '/admin/user/login',
    method: 'post',
    data: query
  })
}

/**
 * 获取七牛token
 * @param {*} query
 */
export function getQiNiuToken (query) {
  return fetch({
    url: '/qiniu/get/token',
    method: 'get',
    params: query
  })
}
