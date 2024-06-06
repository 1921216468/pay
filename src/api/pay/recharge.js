import request from '@/utils/request'

// 新增订单
export function recharge(data) {
    return request({
        url: 'api/recharge/admin/recharge',
        method: 'post',
        data: data
    });
}

    // 新增订单
export function withDrawl(data) {
    return request({
        url: 'api/recharge/admin/withDrawl',
        method: 'post',
        data: data
    });
}