import request from '@/utils/request'

// 查询用户列表
export function listMerchant(query) {
  return request({
    url: '/pay/merchant/list',
    method: 'get',
    params: query
  })
}

// 查询用户详细
export function getMerchant(merchantId) {
  return request({
    url: '/pay/merchant/' + merchantId,
    method: 'get'
  })
}

// 新增用户
export function addMerchant(data) {
  return request({
    url: '/pay/merchant',
    method: 'post',
    data: data
  })
}

// 修改用户
export function updateMerchant(data) {
  return request({
    url: '/pay/merchant',
    method: 'put',
    data: data
  })
}

// 删除用户
export function delMerchant(merchantId) {
  return request({
    url: '/pay/merchant/' + merchantId,
    method: 'delete'
  })
}
