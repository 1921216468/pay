import request from '@/utils/request'

// 查询流水列表
export function listRecords(query) {
  return request({
    url: '/pay/records/list',
    method: 'get',
    params: query
  })
}

// 查询流水详细
export function getRecords(recordsId) {
  return request({
    url: '/pay/records/' + recordsId,
    method: 'get'
  })
}

// 新增流水
export function addRecords(data) {
  return request({
    url: '/pay/records',
    method: 'post',
    data: data
  })
}

// 修改流水
export function updateRecords(data) {
  return request({
    url: '/pay/records',
    method: 'put',
    data: data
  })
}

// 删除流水
export function delRecords(recordsId) {
  return request({
    url: '/pay/records/' + recordsId,
    method: 'delete'
  })
}
