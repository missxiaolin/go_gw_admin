import fetch from '@/common/js/fetch'

/**
 * 获取图纸材料
 * @param {*} data
 */
export function material (data) {
    return fetch({
      url: '/drawing/material',
      method: 'get',
      params: data
    })
}