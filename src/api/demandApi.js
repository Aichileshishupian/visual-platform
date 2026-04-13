import api from '@/utils/request.js'

// 获取需求列表（可带查询参数）
export function getDemandListService(params) {
  console.log('✅ 获取需求列表接口调用', params)
  return api.get('/demand/list', { params })
}

// 发布需求
export function createDemandService(data) {
  console.log('✅ 发布需求接口调用', data)
  return api.post('/demand/create', data)
}

// 获取当前用户的需求
export function getMyDemandsService() {
  console.log('✅ 获取我的需求接口调用')
  return api.get('/demand/my')
}
