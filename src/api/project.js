import fetch from '@/common/js/fetch'

/**
 * 获取项目列表
 * @param {*} data
 */
export function projectList (data) {
    return fetch({
      url: '/project',
      method: 'get',
      params: data
    })
}

/**
 * 添加项目
 * @param {*} data
 */
export function addProject (data) {
    return fetch({
      url: '/project/save',
      method: 'post',
      data: data
    })
}

/**
 * 删除项目
 * @param {*} data
 */
export function delProject (data) {
    return fetch({
      url: '/project/delete',
      method: 'post',
      data: data
    })
}

/**
 * 获取项目
 * @param {*} data
 */
export function infoProject (data) {
    return fetch({
      url: '/project/info',
      method: 'get',
      params: data
    })
}