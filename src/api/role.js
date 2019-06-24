import fetch from '@/common/js/fetch'

/**
 * 获取角色列表
 * @param {*} data
 */
export function roleList (data) {
    return fetch({
      url: '/role',
      method: 'get',
      params: data
    })
}

/**
 * 添加角色
 * @param {*} data
 */
export function addRole (data) {
    return fetch({
      url: '/role/save',
      method: 'get',
      data: data
    })
}

/**
 * 删除角色
 * @param {*} data
 */
export function delRole (data) {
    return fetch({
      url: '/role/delete',
      method: 'post',
      data: data
    })
}

/**
 * 获取角色
 * @param {*} data
 */
export function infoRole (data) {
    return fetch({
      url: '/role/info',
      method: 'get',
      params: data
    })
}

/**
 * 角色禁用启用
 * @param {*} data
 */
export function roleStatus (data) {
    return fetch({
      url: '/role/status',
      method: 'post',
      data: data
    })
}

/**
 * 角色禁用启用
 * @param {*} data
 */
export function roleRouterList (data) {
  return fetch({
    url: '/role/router/list',
    method: 'get',
    params: data
  })
}
