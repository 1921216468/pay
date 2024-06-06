import request from '@/utils/request'

// 查询渠道管理列表
export function listChannel(query) {
  return request({
    url: '/pay/channel/list',
    method: 'get',
    params: query
  })
}

// 查询渠道管理详细
export function getChannel(channelId) {
  return request({
    url: '/pay/channel/' + channelId,
    method: 'get'
  })
}

// 新增渠道管理
export function addChannel(data) {
  return request({
    url: '/pay/channel',
    method: 'post',
    data: data
  })
}

// 修改渠道管理
export function updateChannel(data) {
  return request({
    url: '/pay/channel',
    method: 'put',
    data: data
  })
}

// 删除渠道管理
export function delChannel(channelId) {
  return request({
    url: '/pay/channel/' + channelId,
    method: 'delete'
  })
}
