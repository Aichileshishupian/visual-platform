import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/api/user.js'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const userInfo = ref({})

    // 设置token
    const setToken = (newToken) => {
      token.value = newToken
    }

    // 清除token
    const removeToken = () => {
      token.value = ''
    }

    // 设置用户信息
    const setUser = (obj) => {
      userInfo.value = obj
    }

    // 获取用户信息
    const getUser = async () => {
      try {
        const res = await userGetInfoService()
        userInfo.value = res.data.data || {}
      } catch (err) {
        console.error('获取用户信息失败')
      }
    }

    return {
      token,
      userInfo,
      setToken,
      removeToken,
      setUser,
      getUser
    }
  },
  {
    persist: true // 持久化
  }
)