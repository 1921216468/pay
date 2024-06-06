import request from '@/utils/request'

// 查询渠道详情列表
export function listInfo(query) {
  return request({
    url: '/pay/info/list',
    method: 'get',
    params: query
  })
}

// 查询渠道详情详细
export function getInfo(infoId) {
  return request({
    url: '/pay/info/' + infoId,
    method: 'get'
  })
}

// 新增渠道详情
export function addInfo(data) {
  return request({
    url: '/pay/info',
    method: 'post',
    data: data
  })
}

// 修改渠道详情
export function updateInfo(data) {
  return request({
    url: '/pay/info',
    method: 'put',
    data: data
  })
}

// 删除渠道详情
export function delInfo(infoId) {
  return request({
    url: '/pay/info/' + infoId,
    method: 'delete'
  })
}
