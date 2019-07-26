import fetch from '@/common/js/fetch'

/**
 * 获取图纸类型
 * @param {*} data
 */
export function offerIndex (data) {
    return fetch({
      url: '/offer/index',
      method: 'get',
      params: data
    })
}