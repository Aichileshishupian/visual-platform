import axios from 'axios'

const api = axios.create({
  baseURL: '/mock',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器（可选，自动加 Token）
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器（统一处理错误）
api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.error('请求错误：', err)
    return Promise.reject(err)
  }
)

export default api