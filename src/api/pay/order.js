import request from '@/utils/request'

// 查询订单列表
export function listOrder(query) {
  return request({
    url: '/pay/order/list',
    method: 'get',
    params: query
  })
}

// 查询订单详细
export function getOrder(orderId) {
  return request({
    url: '/pay/order/' + orderId,
    method: 'get'
  })
}

// 新增订单
export function addOrder(data) {
  return request({
    url: '/pay/order',
    method: 'post',
    data: data
  })
}

// 修改订单
export function updateOrder(data) {
  return request({
    url: '/pay/order',
    method: 'put',
    data: data
  })
}

// 删除订单
export function delOrder(orderId) {
  return request({
    url: '/pay/order/' + orderId,
    method: 'delete'
  })
}

// 手动确认回调
export function confirmOrderApi(data) {
  return request({
    url: '/api/order/admin-confirm-order',
    method: 'post',
    data: data
  })
}