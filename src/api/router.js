import fetch from '@/common/js/fetch'

/**
 * 获取管理员列表
 * @param {*} data
 */
export function routerList (data) {
    return fetch({
      url: '/router/index',
      method: 'get',
      params: data
    })
}

/**
 * 添加管理员
 * @param {*} data
 */
export function addRouter (data) {
    return fetch({
      url: '/router/save',
      method: 'post',
      data: data
    })
}

/**
 * 删除管理员
 * @param {*} data
 */
export function delRouter (data) {
    return fetch({
      url: '/router/delete',
      method: 'post',
      data: data
    })
}

/**
 * 获取管理员
 * @param {*} data
 */
export function infoRouter (data) {
    return fetch({
      url: '/router/find',
      method: 'get',
      params: data
    })
}

/**
 * 管理员禁用启用
 * @param {*} data
 */
export function UserStatus (data) {
    return fetch({
      url: '/user/status',
      method: 'post',
      data: data
    })
}