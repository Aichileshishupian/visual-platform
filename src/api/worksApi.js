import api from '@/utils/request.js'

// 获取作品列表
export function getWorksListService() {
  console.log('✅ 获取作品列表接口调用')
  return api.get('/works/getImages')
}