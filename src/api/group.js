import fetch from '@/common/js/fetch'

/**
 * 获取管理员列表
 * @param {*} data
 */
export function groupList (data) {
    return fetch({
      url: '/group',
      method: 'get',
      params: data
    })
}

/**
 * 添加管理员
 * @param {*} data
 */
export function addGroup (data) {
    return fetch({
      url: '/group/save',
      method: 'post',
      data: data
    })
}

/**
 * 删除管理员
 * @param {*} data
 */
export function delGroup (data) {
    return fetch({
      url: '/group/delete',
      method: 'post',
      data: data
    })
}

/**
 * 获取分组
 * @param {*} data
 */
export function infoGroup (data) {
    return fetch({
      url: '/group/find',
      method: 'get',
      params: data
    })
}
