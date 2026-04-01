<template>
 <el-form label-position="top">
    <!-- 作品名称-->
    <el-form-item label="作品名称">
      <el-input placeholder="请输入作品名称" />
    </el-form-item>
  <!-- 作品描述-->
    <el-form-item label="作品描述">
      <el-input placeholder="请输入作品描述" />
    </el-form-item>
  <!-- 作品风格-->
 
    <el-form-item label="作品风格">
      <el-select
          v-model="value"
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
  <el-upload action="#" list-type="picture-card" :auto-upload="false">
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
    <el-button type="primary">上传作品</el-button> 
  </div>
  
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import type { UploadFile } from 'element-plus'

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

const handleRemove = (file: UploadFile) => {
  console.log(file)
}

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

const handleDownload = (file: UploadFile) => {
  console.log(file)
}


const value = ref<string[]>([])
const options = [
  {
    value: 'HTML',
    label: 'HTML',
  },
  {
    value: 'CSS',
    label: 'CSS',
  },
  {
    value: 'JavaScript',
    label: 'JavaScript',
  },
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