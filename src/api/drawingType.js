import fetch from '@/common/js/fetch'

/**
 * 获取图纸类型
 * @param {*} data
 */
export function drawingType (data) {
    return fetch({
      url: '/drawing/type',
      method: 'get',
      params: data
    })
}