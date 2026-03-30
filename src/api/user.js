import axios from 'axios'

const api = axios.create({
  baseURL: '' // 你可以在这里改成你的后端地址，例如：http://localhost:3000
})

export function userRegisterService(data) {
  // 如果你没有后端接口，可先用以下mock实现：
   return Promise.resolve({ data: { message: 'mock register success' } })
  //return api.post('/register', data)
}

export function userLoginService(data) {
  // 如果你没有后端接口，可先用以下 mock 实现：
   return Promise.resolve({ data: { token: 'mock-token' } })
  //return api.post('/login', data)
}

export function userGetInfoService() {
  return Promise.resolve({ data: { data: { name: '匿名用户' } } })
 // return api.get('/user/info')
}