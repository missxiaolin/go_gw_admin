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
 * 获取需求单
 * @param {*} data
 */
export function drawingList (data) {
	console.log(data)
    return fetch({
      url: '/drawing/index',
      method: 'get',
      params: data
    })
}
/**
 * 删除
 */
export function delDrawing (data) {
	console.log(data)
    return fetch({
      url: '/drawing/delete',
      method: 'get',
      params: data
    })
}
/**
 * 发布
 * @param {Object} data
 */
export function publish (data) {
	console.log(data)
    return fetch({
      url: '/drawing/publish',
      method: 'get',
      params: data
    })
}
/**
 * info
 * @param {Object} data
 */
export function info (data) {
	console.log(data)
    return fetch({
      url: '/drawing/info',
      method: 'get',
      params: data
    })
}
/**
 * 获取qiniutoken
 * @param {*} data
 */
export function uploadToken (data) {
    return fetch({
      url: '/upload/token',
      method: 'get',
      params: data
    })
}

export function offerList (data) {
  return fetch({
    url: '/offer/index',
    method: 'get',
    params: data
  })
}

export function buildOrder (data) {
  return fetch({
    url: '/order/save',
    method: 'post',
    data: data
  })
}

export function getOffer(data) {
  return fetch({
    url: '/order/offer',
    method: 'get',
    params: data
  })
}
