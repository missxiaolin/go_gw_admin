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

/**
 * 申请提现
 */
export function userApply(query)
{
  return fetch({
    url: '/cash/apply',
    method: 'post',
    data: query
  });
}
