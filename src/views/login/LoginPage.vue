<script setup>
import { ref, reactive, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user.js'
import { useRouter } from 'vue-router'
import { userRegisterService, userLoginService } from '@/api/user.js'


const isRegister = ref(false)
const form = ref(null)

const formModel = reactive({
  username: '',
  password: '',
  confirmPassword: ''
})


const rules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 10, message: '用户名必须是 5-10 位字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '密码 6-15 位', trigger: 'blur' }
  ]
})

watch(isRegister, (newVal) => {
  if (newVal) {
   
    rules.value.confirmPassword = [
      { required: true, message: '请输入确认密码', trigger: 'blur' },
      { pattern: /^\S{6,15}$/, message: '密码 6-15 位', trigger: 'blur' },
      {
        validator: (rule, value) => {
          if (value !== formModel.password) return Promise.reject('两次密码不一致')
          return Promise.resolve()
        },
        trigger: 'blur'
      }
    ]
  } else {
  
    if (rules.value.confirmPassword) {
      delete rules.value.confirmPassword
    }
  }
  form.value?.clearValidate()
  formModel.username = ''
  formModel.password = ''
  formModel.confirmPassword = ''
})

const router = useRouter()
const userStore = useUserStore()

// 注册
const register = async () => {
  try {
    // 先校验表单
    const valid = await form.value.validate()
    if (!valid) return

    const res = await userRegisterService(formModel)
    console.log('注册接口返回：', res)

    if (res) {
      ElMessage.success('注册成功')
      localStorage.setItem('registeredUser', JSON.stringify({
      username: formModel.username,
      password: formModel.password
    }))
      setTimeout(() => {
        isRegister.value = false
      }, 1000)

    }
  } catch (err) {
    ElMessage.error('注册失败：' + (err.message || '请检查信息'))
    console.error('注册异常：', err)
  }
}

// 登录
const login = async () => {
  try {
    const valid = await form.value.validate()
    if (!valid) return

    // 读取本地注册用户
    const localUser = JSON.parse(localStorage.getItem('registeredUser'))

    // 1. 未注册
    if (!localUser) {
      ElMessage.error('请先注册！')
      return
    }

    // 2. 账号密码错误
    if (formModel.username !== localUser.username || formModel.password !== localUser.password) {
      ElMessage.error('账号或密码错误')
      return
    }

    // ✅ 登录成功
    userStore.setToken('LOGIN_SUCCESS')

    // ✅ 存入用户信息（头像显示关键）
    userStore.setUser({
      username: formModel.username,
      avatar: 'https://picsum.photos/id/64/200/200'
    })

    ElMessage.success('登录成功')
    router.push('/works/WorkList')
  } catch (err) {
    ElMessage.error('登录失败')
  }
}

// 提交按钮
const submit = () => {
  isRegister.value ? register() : login()
}



</script>

<template>
  <el-row class="login-view">
    <el-col :span="24" class="bg">
      <el-col :span="6" :offset="9" class="login-container">
        <div class="card">
          <div class="heading">
            <h2>{{ isRegister ? '注册账号' : '登录平台' }}</h2>
            <el-button type="text" @click="isRegister = !isRegister">
              {{ isRegister ? '已有账号？登录' : '没有账号？注册' }}
            </el-button>
          </div>

          <el-form :model="formModel" :rules="rules" ref="form" size="large" class="login-form">
            <el-form-item prop="username">
              <el-input v-model="formModel.username" :prefix-icon="User" placeholder="用户名" />
            </el-form-item>

            <el-form-item prop="password">
              <el-input v-model="formModel.password" :prefix-icon="Lock" type="password" placeholder="密码" />
            </el-form-item>

            <el-form-item v-if="isRegister" prop="confirmPassword">
              <el-input v-model="formModel.confirmPassword" :prefix-icon="Lock" type="password" placeholder="确认密码" />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" block @click="submit">
                {{ isRegister ? '注册' : '登录' }}
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-col>
  </el-row>
</template>

<style scoped>
.login-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bg {
  min-height: 100vh;
  background-image: url('@/assets/login-bg.jpg');
  background-size: cover;
  background-position: center;
}
.login-container { padding: 22px 0; }
.card {
  background: rgba(255, 255, 255, 0.92);
  border-radius: 12px;
  padding: 24px;
  min-height: 480px;
  margin-top: 100px;
}
.heading {
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
}
</style>