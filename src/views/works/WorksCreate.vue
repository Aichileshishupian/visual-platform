<template>
 <el-form label-position="top">
    <!-- 作品名称-->
    <el-form-item label="作品名称">
      <el-input  v-model="form.name" placeholder="请输入作品名称" />
    </el-form-item>
  <!-- 作品描述-->
    <el-form-item label="作品描述">
      <el-input v-model="form.description" placeholder="请输入作品描述" />
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
<div class="upload-card">
  <el-upload 
    ction="#" 
    list-type="picture-card" 
    :auto-upload="false" 
    @change="handleFileChange"
  >
    <el-icon><Plus /></el-icon>

    <template #file="{ file }">
      <div>
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
            class="el-upload-list__item-delete"
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

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</div>

  <div class="button-row">
    <el-button type="primary"  @click="submitForm">上传作品</el-button> 
  </div>
  
</template>

<script  setup>
import { ref } from 'vue'
import { useWorksStore } from '@/stores/workstore.js'
import { ElMessage } from 'element-plus'
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
const handleFileChange = (file) => {
  form.value.imgUrl = file.url
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
  console.log('提交的表单数据：', form.value)
  console.log('当前作品列表：', workStore.workList)
}


//作品风格的数据
const value = ref([]) // 作品风格选项数据
const options = [
  { value: '简约', label: '简约' },
  { value: '清新', label: '清新' },
  { value: '复古', label: '复古' },
  { value: '文艺', label: '文艺' },
  { value: '可爱', label: '可爱' },
  { value: '治愈', label: '治愈' },
  { value: '高级', label: '高级' },
  { value: '暗黑', label: '暗黑' },
  { value: '赛博', label: '赛博' },
  { value: '国风', label: '国风' },
  { value: '日系', label: '日系' },
  { value: '轻奢', label: '轻奢' },
  { value: '卡通', label: '卡通' },
  { value: '写实', label: '写实' },
  { value: '抽象', label: '抽象' },
]


</script>
<style scoped>
.upload-card {
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fafafa;
}
.el-button {
  margin-top: 18px;
}
</style>