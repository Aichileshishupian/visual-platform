import api from '@/utils/request.js'

// 获取订单列表（可带查询参数：status, page, size 等）
export function getOrderListService(params) {
  console.log('✅ 获取订单列表接口调用', params)
  return api.get('/order/list', { params })
}

// 创建订单（示例）
export function createOrderService(data) {
  console.log('✅ 创建订单接口调用', data)
  return api.post('/order/create', data)
}

// 更新订单状态（例如：pending -> finished）
export function updateOrderStatusService(id, status) {
  console.log('✅ 更新订单状态接口调用', id, status)
  return api.post('/order/updateStatus', { id, status })
}

// 获取当前用户的订单
export function getMyOrdersService() {
  console.log('✅ 获取我的订单接口调用')
  return api.get('/order/my')
}
