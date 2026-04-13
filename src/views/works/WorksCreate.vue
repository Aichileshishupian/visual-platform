<template>
  <div class="works-create">
    <h2 class="page-title">发布作品</h2>

    <div class="grid">
      <div class="form-card">
        <el-form label-position="top" :model="form">
          <!-- 作品名称-->
          <el-form-item label="作品名称">
            <el-input v-model="form.name" placeholder="请输入作品名称" />
          </el-form-item>

          <!-- 作品描述-->
          <el-form-item label="作品描述">
            <el-input type="textarea" rows="4" v-model="form.description" placeholder="请输入作品描述" />
          </el-form-item>

          <!-- 作品风格-->
          <el-form-item label="作品风格">
            <el-select
              v-model="form.style"
              multiple
              placeholder="请选择作品风格"
              clearable
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <div class="upload-card">
        <el-upload
          ction="#"
          list-type="picture-card"
          :auto-upload="false"
          @change="handleFileChange"
        >
          <el-icon><Plus /></el-icon>

          <template #file="{ file }">
            <div class="thumb-wrap">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <el-icon><zoom-in /></el-icon>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-download"
                  @click="handleDownload(file)"
                >
                  <el-icon><Download /></el-icon>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <el-icon><Delete /></el-icon>
                </span>
              </span>
            </div>
          </template>
        </el-upload>

        <el-dialog v-model="dialogVisible" width="60%">
          <img class="preview-image" :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>

        <div class="button-row">
          <el-button type="primary" @click="submitForm">上传作品</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script  setup>
import { ref } from 'vue'
import { useWorksStore } from '@/stores/workstore.js'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()

//表单数据结构
const form = ref({
  name: '',//作品名称
  description: '',//作品描述
  style: [],//作品风格，
  imgUrl:'',//作品图片地址
})



//关于图片上传的内容
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

const handleRemove = (file) => {
  console.log(file)
}

const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}

const handleDownload = (file) => {
  console.log(file)
}

// 上传图片时，把地址存入表单
// 永久有效版本！！！
const handleFileChange = (uploadFile) => {
  const file = uploadFile.raw
  const reader = new FileReader()
  reader.readAsDataURL(file) // 转成永久字符串
  reader.onload = () => {
    form.value.imgUrl = reader.result // 永久地址
  }
}

//提交表单数据
const workStore = useWorksStore()
const submitForm = () => {
  workStore.addWork({
    id: Date.now(), // 生成一个唯一的ID
    imageUrl: form.value.imgUrl,
    likeCount: 0,
    collectCount: 0,
    title: form.value.name,
    description: form.value.description,
    style: form.value.style,
    isLiked: false,
    isCollected: false
  }) ,
  ElMessage.success('作品上传成功！')
  setTimeout(() => {
    router.push('/works/WorkList')
  }, 1000)  

  console.log('提交的表单数据：', form.value)
  console.log('当前作品列表：', workStore.workList)
}


//作品风格的数据
const value = ref([]) // 作品风格选项数据
const options = [
  // 原有风格
  { value: '自然风光', label: '自然风光' },
  { value: '海边风景', label: '海边风景' },
  { value: '森林风光', label: '森林风光' },
  { value: '雪山湖泊', label: '雪山湖泊' },
  { value: '田园风光', label: '田园风光' },
  { value: '古镇风景', label: '古镇风景' },
  { value: '草原星空', label: '草原星空' },
  { value: '山水瀑布', label: '山水瀑布' },
  { value: '花海风景', label: '花海风景' },
  { value: '峡谷风光', label: '峡谷风光' },
  // 新增风格
  { value: '治愈', label: '治愈' },
  { value: '高级', label: '高级' },
  { value: '浪漫', label: '浪漫' },
  { value: '清新', label: '清新' },
  { value: '写实', label: '写实' },
  { value: '自然', label: '自然' },
  { value: '文艺', label: '文艺' },
  { value: '国风', label: '国风' }
]


</script>
<style scoped>
.works-create {
  max-width: 1100px;
  margin: 24px auto;
  padding: 0 16px;
}
.page-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #303133;
}
.grid {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}
.form-card {
  flex: 1 1 0;
  padding: 18px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #eef1f6;
  box-shadow: 0 2px 8px rgba(20,24,31,0.04);
}
.upload-card {
  width: 420px;
  min-width: 320px;
  padding: 18px;
  border: 1px solid #eef1f6;
  border-radius: 8px;
  background: linear-gradient(180deg, #ffffff, #fbfdff);
  box-shadow: 0 6px 18px rgba(50,64,84,0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.upload-card .el-upload {
  width: 100%;
  display: flex;
  justify-content: center;
}
.thumb-wrap {
  position: relative;
  display: inline-block;
}
.el-upload-list__item-thumbnail {
  width: 180px;
  height: 120px;
  object-fit: cover;
  border-radius: 6px;
  display: block;
}
.el-upload-list__item-actions {
  display: flex;
  gap: 8px;
  margin-top: 8px;
  justify-content: center;
}
.el-upload-list__item-actions .el-upload-list__item-preview,
.el-upload-list__item-actions .el-upload-list__item-delete,
.el-upload-list__item-actions .el-upload-list__item-download {
  cursor: pointer;
  color: #606266;
}
.button-row {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 18px;
}
.button-row .el-button {
  min-width: 160px;
}
.preview-image {
  width: 100%;
  height: auto;
  border-radius: 6px;
}

@media (max-width: 900px) {
  .grid {
    flex-direction: column;
  }
  .upload-card {
    width: 100%;
    min-width: 0;
  }
}
</style>