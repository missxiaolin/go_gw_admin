import fetch from '@/common/js/fetch'

/**
 * 获取图纸类型
 * @param {*} data
 */
export function drawingSave (data) {
    return fetch({
      url: '/drawing/save',
      method: 'get',
      params: data
    })
}

/**
 * 获取token
 * @param {*} data
 */
export function uploadToken (data) {
    return fetch({
      url: '/upload/token',
      method: 'get',
      params: data
    })
}
