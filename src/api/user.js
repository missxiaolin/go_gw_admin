import fetch from '@/common/js/fetch'

/**
 * 获取管理员列表
 * @param {*} data
 */
export function userList (data) {
    return fetch({
      url: '/user',
      method: 'get',
      params: data
    })
}

/**
 * 添加管理员
 * @param {*} data
 */
export function addUser (data) {
    return fetch({
      url: '/user/save',
      method: 'post',
      data: data
    })
}

/**
 * 删除管理员
 * @param {*} data
 */
export function delUser (data) {
    return fetch({
      url: '/user/delete',
      method: 'post',
      data: data
    })
}

/**
 * 获取管理员
 * @param {*} data
 */
export function infoUser (data) {
    return fetch({
      url: '/user/find',
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