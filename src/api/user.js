import fetch from '@/common/js/fetch'

/**
 * 个人中心
 */
export function userInfo(query)
{
  return fetch({
    url: '/user/info',
    method: 'get',
    param: query
  });
}
