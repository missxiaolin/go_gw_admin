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