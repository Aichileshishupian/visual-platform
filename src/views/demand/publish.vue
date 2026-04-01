<template>
 <el-form label-position="top">
    <!-- 我的需求-->
<el-form-item label="我的需求">
      <el-select
          v-model="value"
          multiple
          placeholder="请选择需求类型"
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
  <!-- 我的需求-->
    <el-form-item label="需求描述">
       <el-input placeholder="请输入需求描述" />
    </el-form-item>
    
    <!-- 我的需求-->
    <el-form-item label="预算区间">
       <el-input placeholder="请输入预算区间" />
    </el-form-item>
   <el-form-item label="地点">
      <el-select
          v-model="value"
         
          placeholder="请选择地点"
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

 <div class="button-row">
    <el-button type="primary">发布需求</el-button> 
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