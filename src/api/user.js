import api from '@/utils/request.js'

// 注册
export function userRegisterService(data) {
  console.log('✅ 注册接口开始调用')
  return api.post('/user/register', data)
}

// 登录
export function userLoginService(data) {
  console.log('✅ 登录接口开始调用')
  return api.get('/user/login', data)
}

// 获取用户信息
export function userGetInfoService() {
  console.log('✅ 用户信息接口调用')
  return api.get('/user/info')
}