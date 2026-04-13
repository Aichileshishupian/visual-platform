<template>
  <div class="profile-page">
    <!-- 信息卡片 -->
    <div class="profile-card">
      <div class="card-body">
        <!-- 头像区域 -->
        <div class="avatar-section">
          <!-- 编辑模式：可上传头像 -->
          <el-upload
            v-if="editMode"
            class="avatar-uploader"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
            :on-error="handleAvatarError"
            action="/api/upload/avatar"
            accept="image/png,image/jpeg,image/jpg"
          >
            <el-image
              class="avatar"
              :src="previewAvatar || user?.avatar || defaultAvatar"
              fit="cover"
            />
            <div class="upload-mask">
              <el-icon size="18"><Upload /></el-icon>
              <span>点击上传</span>
            </div>
          </el-upload>

          <!-- 查看模式：仅展示 -->
          <div v-else class="avatar-view" @click="startEdit">
            <el-image
              class="avatar"
              :src="user?.avatar || defaultAvatar"
              fit="cover"
              preview-teleported
            />
            <div class="view-tip">
              <el-icon size="14"><Edit /></el-icon>
            </div>
          </div>
        </div>

        <!-- 基础信息 -->
        <div class="base-info">
          <h2 class="username">{{ user?.username || '未设置用户名' }}</h2>
          <p class="desc">
            {{ user?.place || '未设置地区' }} ·
            {{ user?.telephone || '未设置手机号' }}
          </p>
          <p class="email" v-if="user?.email">
            <el-icon><Message /></el-icon>
            {{ user.email }}
          </p>
        </div>

        <!-- 操作按钮 -->
        <div class="action-buttons">
          <el-button
            type="primary"
            plain
            @click="startEdit"
            :disabled="editMode"
          >
            <el-icon><Edit /></el-icon>
            编辑资料
          </el-button>
        </div>
      </div>
    </div>

    <!-- 查看模式：详情 -->
    <div class="info-card" v-if="!editMode">
      <div class="card-title">详细信息</div>
      <div class="info-list">
        <div class="info-item">
          <label>个性签名</label>
          <span>{{ user?.remarks || '这个人很懒，什么都没留下' }}</span>
        </div>
        <div class="info-item">
          <label>联系地址</label>
          <span>{{ user?.address || '未设置' }}</span>
        </div>
      </div>
    </div>

    <!-- 编辑模式：表单 -->
    <div class="edit-card" v-else>
      <div class="card-title">编辑个人资料</div>
      <el-form
        :model="form"
        ref="formRef"
        :rules="rules"
        label-width="80px"
        class="edit-form"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" clearable />
        </el-form-item>

        <el-form-item label="手机号码" prop="telephone">
          <el-input v-model="form.telephone" placeholder="请输入手机号" clearable />
        </el-form-item>

        <el-form-item label="所在地区" prop="place">
          <el-input v-model="form.place" placeholder="如：北京市·朝阳区" clearable />
        </el-form-item>

        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" clearable />
        </el-form-item>

        <el-form-item label="联系地址">
          <el-input v-model="form.address" type="textarea" :rows="2" placeholder="请输入详细地址" />
        </el-form-item>

        <el-form-item label="个性签名">
          <el-input
            v-model="form.remarks"
            type="textarea"
            :rows="3"
            placeholder="一句话介绍自己"
            show-word-limit
            maxlength="60"
          />
        </el-form-item>

        <el-form-item class="form-btns">
          <el-button type="primary" @click="submitForm" :loading="loading">
            保存修改
          </el-button>
          <el-button @click="resetEdit">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/userstore.js'
import { Edit, Upload, Message } from '@element-plus/icons-vue'

const userStore = useUserStore()
const user = computed(() => userStore.userInfo || {})

// 默认头像
const defaultAvatar = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
// 头像预览（上传中临时显示）
const previewAvatar = ref('')

// 编辑状态
const editMode = ref(false)
const loading = ref(false)
const formRef = ref(null)

// 表单
const form = ref({
  username: '',
  telephone: '',
  place: '',
  address: '',
  email: '',
  remarks: '',
  avatar: ''
})

// 校验规则
const rules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  telephone: [
    { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
  ],
  email: [
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ]
})

// 初始化表单
const initForm = () => {
  form.value = {
    username: user.value.username || '',
    telephone: user.value.telephone || '',
    place: user.value.place || '',
    address: user.value.address || '',
    email: user.value.email || '',
    remarks: user.value.remarks || '',
    avatar: user.value.avatar || ''
  }
  previewAvatar.value = ''
}

// 开始编辑
const startEdit = () => {
  initForm()
  editMode.value = true
}

// 取消编辑
const resetEdit = () => {
  editMode.value = false
  previewAvatar.value = ''
  ElMessage.info('已取消编辑')
}

// 提交保存
const submitForm = async () => {
  await formRef.value.validate()
  loading.value = true

  setTimeout(() => {
    userStore.setUser({ ...userStore.userInfo, ...form.value })
    loading.value = false
    editMode.value = false
    previewAvatar.value = ''
    ElMessage.success('个人资料保存成功')
  }, 400)
}

// ==================== 头像上传相关 ====================
// 上传前校验
const beforeAvatarUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isImage) {
    ElMessage.error('只能上传 JPG / PNG 图片')
    return false
  }
  if (!isLt2M) {
    ElMessage.error('图片大小不能超过 2MB')
    return false
  }

  // 本地预览
  previewAvatar.value = URL.createObjectURL(file)
  ElMessage.success('图片已选择，保存后生效')
  return true
}

// 上传成功
const handleAvatarSuccess = (res) => {
  if (res?.url) {
    form.value.avatar = res.url
    previewAvatar.value = res.url
    ElMessage.success('头像上传成功，保存后生效')
  } else {
    ElMessage.error('头像上传失败：返回格式异常')
  }
}

// 上传失败
const handleAvatarError = () => {
  previewAvatar.value = ''
  ElMessage.error('头像上传失败，请检查接口或重试')
}
</script>

<style scoped>
.profile-page {
  max-width: 920px;
  margin: 32px auto;
  padding: 0 16px;
}

/* 顶部卡片 */
.profile-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 6px 24px rgba(17, 24, 39, 0.06);
  border: 1px solid #eef2f6;
  overflow: hidden;
  margin-bottom: 20px;
}

.card-body {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px;
  flex-wrap: wrap;
}

/* 头像 */
.avatar-section {
  position: relative;
}

.avatar-view,
.avatar-uploader {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  transition: all 0.25s ease;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 查看模式 hover 提示 */
.avatar-view:hover {
  transform: scale(1.03);
}
.view-tip {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 28px;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

/* 上传遮罩 */
.upload-mask {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.2s;
}
.avatar-uploader:hover .upload-mask {
  opacity: 1;
}

/* 基础信息 */
.base-info {
  flex: 1;
  min-width: 220px;
}

.username {
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 6px;
}

.desc {
  color: #6b7280;
  font-size: 14px;
  margin: 0;
}

.email {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #4b5563;
  font-size: 13px;
  margin-top: 6px;
}

.action-buttons {
  margin-left: auto;
}

/* 信息卡片 */
.info-card,
.edit-card {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #eef2f6;
  box-shadow: 0 4px 12px rgba(17, 24, 39, 0.04);
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 18px;
}

.info-list {
  display: grid;
  gap: 16px;
}

.info-item {
  display: flex;
  align-items: flex-start;
  font-size: 14px;
}

.info-item label {
  width: 90px;
  color: #4b5563;
  font-weight: 500;
}

.info-item span {
  color: #1f2937;
  flex: 1;
}

/* 编辑表单 */
.edit-form {
  max-width: 680px;
}

.form-btns {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 10px;
}

/* 响应式 */
@media (max-width: 768px) {
  .card-body {
    flex-direction: column;
    text-align: center;
  }
  .action-buttons {
    margin-left: 0;
    width: 100%;
  }
  .form-btns {
    justify-content: center;
  }
}
</style>