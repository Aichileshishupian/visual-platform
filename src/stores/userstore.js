import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 1. 从 localStorage 初始化，刷新不丢
  const token = ref(localStorage.getItem('token') || null)
  const userInfo = ref(JSON.parse(localStorage.getItem('userInfo')) || null)

  // 2. 设置 token：同时存到内存 + localStorage
  const setToken = (newToken) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  // 3. 设置用户信息：同时存到内存 + localStorage
  const setUser = (user) => {
    userInfo.value = user
    localStorage.setItem('userInfo', JSON.stringify(user))
  }

  // 4. 退出登录：清空内存 + 本地存储
  const logout = () => {
    token.value = null
    userInfo.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
  }

  // 5. 计算属性：判断是否登录（路由守卫用）
  const isLogin = computed(() => !!token.value)

  return {
    token,
    userInfo,
    setToken,
    setUser,
    logout,
    isLogin
  }
})