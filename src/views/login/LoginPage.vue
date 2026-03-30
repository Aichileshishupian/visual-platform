<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user.js'
import { useRouter } from 'vue-router'
import { userRegisterService, userLoginService } from '@/api/user.js'

const isRegister = ref(false)
const form = ref(null)

const formModel = ref({
  username: '',
  password: '',
  confirmPassword: ''
})

const rules = computed(() => ({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 10, message: '用户名必须是 5-10 位字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是 6-15 位的非空字符',
      trigger: 'blur'
    }
  ],
  ...(isRegister.value
    ? {
        confirmPassword: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码必须是 6-15 位的非空字符',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              if (value !== formModel.value.password) {
                callback(new Error('两次输入密码不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    : {})
}))

const userStore = useUserStore()
const router = useRouter()

const clearForm = () => {
  formModel.value = {
    username: '',
    password: '',
    confirmPassword: ''
  }
  form.value?.resetFields()
}

watch(isRegister, clearForm)

const register = async () => {
  const valid = await form.value.validate().catch(() => false)
  if (!valid) {
    ElMessage.error('注册表单校验失败')
    return
  }

  try {
    await userRegisterService(formModel.value)
    ElMessage.success('注册成功，请登录')
    isRegister.value = false
    clearForm()
    router.push('/firstpage')
  } catch (error) {
    ElMessage.error(error?.response?.data?.message || '注册失败，请重试')
  }
}

const login = async () => {
  const valid = await form.value.validate().catch(() => false)
  if (!valid) {
    ElMessage.error('登录表单校验失败')
    return
  }

  try {
    const res = await userLoginService(formModel.value)
    userStore.setToken(res.data.token)
    ElMessage.success('登录成功')
    router.push('/')
  } catch (error) {
    ElMessage.error(error?.response?.data?.message || '登录失败，请重试')
  }
}

const submit = () => {
  if (isRegister.value) {
    register()
  } else {
    login()
  }
}
</script>

<template>

    <el-row  class="login-view">
      <el-col :span="12" class="bg" />
      <el-col :span="6" :offset="3" class="login-container">
        <div class="card">
          <div class="heading">
            <h2>{{ isRegister ? '注册账号' : '登录平台' }}</h2>
            <el-button type="text" @click="isRegister = !isRegister">
              {{ isRegister ? '已有账号？点此登录' : '没有账号？点此注册' }}
            </el-button>
          </div>

          <el-form
            :model="formModel"
            :rules="rules"
            ref="form"
            size="large"
            autocomplete="off"
            class="login-form"
          >
            <el-form-item prop="username">
              <el-input
                v-model="formModel.username"
                :prefix-icon="User"
                placeholder="请输入用户名"
              />
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                v-model="formModel.password"
                :prefix-icon="Lock"
                type="password"
                placeholder="请输入密码"
              />
            </el-form-item>

            <el-form-item v-if="isRegister" prop="confirmPassword">
              <el-input
                v-model="formModel.confirmPassword"
                :prefix-icon="Lock"
                type="password"
                placeholder="请确认密码"
              />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" class="button" @click="submit" block>
                {{ isRegister ? '注册' : '登录' }}
              </el-button>
            </el-form-item>
          </el-form>
        </div>
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
  background-image: url('@/assets/login-bg.png');
  background-size: cover;
  background-position: center;
}

.login-container {
  padding: 22px 0;
}

.card {
  background: rgba(255, 255, 255, 0.92);
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  padding: 24px;
  min-height: 480px;
}

.heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.login-form .el-form-item {
  margin-bottom: 15px;
}

.button {
  width: 100%;
}
</style>
