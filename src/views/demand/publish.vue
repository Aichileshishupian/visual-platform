<template>
  <div class="publish-page">
    <div class="form-card">
      <el-form label-position="top" :model="form" ref="formRef" :rules="rules">
  <!-- 我的需求-->
  <el-form-item label="我的需求">
      <el-select
        v-model="form.type"
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


  <!-- 需求描述-->
    <el-form-item label="需求描述">
      <el-input type="textarea" rows="6" v-model="form.description" placeholder="请输入需求描述（建议填写需求背景、交付时长与期望风格）" />
    </el-form-item>
    
    <div class="form-row">
      <el-form-item class="col" label="预算区间">
        <el-select v-model="form.budget" placeholder="请选择预算区间" clearable>
          <el-option
            v-for="item in budgetOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item class="col" label="地点">
        <el-select
          v-model="form.location"
          placeholder="请选择地点"
          clearable
        >
          <el-option
            v-for="item in localoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </div>
      </el-form>
    </div>

    <div class="button-row">
      <el-button type="primary" :loading="submitting" @click="submitDemand">发布需求</el-button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useDemandStore  } from '@/stores/demandstore.js'
import { useUserStore } from '@/stores/userstore.js'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'


const router = useRouter()
const demandStore = useDemandStore()
const userStore = useUserStore()

const form = ref({
  type: '',
  description: '',
  budget: '',
  location: ''
})
const submitting = ref(false)
const formRef = ref(null)

const rules = {
  type: [{ required: true, message: '请选择需求类型', trigger: 'change' }],
  description: [{ required: true, message: '请输入需求描述', trigger: 'blur' }],
  budget: [{ required: true, message: '请选择预算区间', trigger: 'change' }]
}

const budgetOptions = ref([
  { value: '', label: '面议' },
  { value: '0-100', label: '0 - 100 元' },
  { value: '100-500', label: '100 - 500 元' },
  { value: '500-1000', label: '500 - 1000 元' },
  { value: '1000-5000', label: '1000 - 5000 元' },
  { value: '5000+', label: '5000 元以上' }
])

const options = ref([
  { value: '', label: '全部服务' },
  { value: '约拍', label: '约拍' },
  { value: '海报设计', label: '海报设计' },
  { value: 'LOGO设计', label: 'LOGO设计' },
  { value: 'VI设计', label: 'VI设计' },
  { value: '宣传册设计', label: '宣传册设计' },
  { value: '包装设计', label: '包装设计' },
  { value: '电商主图', label: '电商主图' },
  { value: '详情页设计', label: '详情页设计' },
  { value: '名片设计', label: '名片设计' },
  { value: 'PPT设计', label: 'PPT设计' },
  { value: '插画绘制', label: '插画绘制' },
  { value: '手绘定制', label: '手绘定制' },
  { value: '头像定制', label: '头像定制' },
  { value: '短视频剪辑', label: '短视频剪辑' },
  { value: '宣传片制作', label: '宣传片制作' },
  { value: 'UI设计', label: 'UI设计' },
  { value: 'icon图标', label: 'icon图标' },
  { value: 'banner设计', label: 'banner设计' },
  { value: '三折页设计', label: '三折页设计' },
  { value: '文创设计', label: '文创设计' },
  { value: '字体设计', label: '字体设计' },
  { value: '修图调色', label: '修图调色' },
  { value: '商业摄影', label: '商业摄影' },
  { value: '产品拍摄', label: '产品拍摄' }
])

const localoptions = ref([
  { value: '', label: '全部省份' },
  { value: '北京市', label: '北京市' },
  { value: '天津市', label: '天津市' },
  { value: '河北省', label: '河北省' },
  { value: '山西省', label: '山西省' },
  { value: '内蒙古自治区', label: '内蒙古自治区' },
  { value: '辽宁省', label: '辽宁省' },
  { value: '吉林省', label: '吉林省' },
  { value: '黑龙江省', label: '黑龙江省' },
  { value: '上海市', label: '上海市' },
  { value: '江苏省', label: '江苏省' },
  { value: '浙江省', label: '浙江省' },
  { value: '安徽省', label: '安徽省' },
  { value: '福建省', label: '福建省' },
  { value: '江西省', label: '江西省' },
  { value: '山东省', label: '山东省' },
  { value: '河南省', label: '河南省' },
  { value: '湖北省', label: '湖北省' },
  { value: '湖南省', label: '湖南省' },
  { value: '广东省', label: '广东省' },
  { value: '广西壮族自治区', label: '广西壮族自治区' },
  { value: '海南省', label: '海南省' },
  { value: '重庆市', label: '重庆市' },
  { value: '四川省', label: '四川省' },
  { value: '贵州省', label: '贵州省' },
  { value: '云南省', label: '云南省' },
  { value: '西藏自治区', label: '西藏自治区' },
  { value: '陕西省', label: '陕西省' },
  { value: '甘肃省', label: '甘肃省' },
  { value: '青海省', label: '青海省' },
  { value: '宁夏回族自治区', label: '宁夏回族自治区' },
  { value: '新疆维吾尔自治区', label: '新疆维吾尔自治区' },
  { value: '香港特别行政区', label: '香港特别行政区' },
  { value: '澳门特别行政区', label: '澳门特别行政区' },
  { value: '台湾省', label: '台湾省' },
])

// 提交发布（带校验）
const submitDemand = () => {
  if (!formRef.value) return
  formRef.value.validate(async (valid) => {
    if (!valid) return
    submitting.value = true
    try {
      // 映射为 store 期望的字段：place 使用 location
      demandStore.addDemand({
        type: form.value.type,
        description: form.value.description,
        budget: form.value.budget,
        place: form.value.location,
        telephone: form.value.telephone || '',
        username: userStore.userInfo?.username || '当前用户'
      })

      ElMessage.success('发布成功！')
      // 重置表单
      form.value = { type: '', description: '', budget: '', location: '' }
      // 跳转到搜索页查看
      router.push('/demand/search')
    } catch (err) {
      console.error('发布失败', err)
      ElMessage.error('发布失败')
    } finally {
      submitting.value = false
    }
  })
}
</script>


<style scoped>
.publish-page {
  max-width: 900px;
  margin: 28px auto;
  padding: 0 16px;
}
.form-card {
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  border: 1px solid #eef2f6;
  box-shadow: 0 6px 18px rgba(20,24,31,0.04);
}
.form-row {
  display: flex;
  gap: 16px;
  align-items: stretch;
}
.form-row .col {
  flex: 1;
}
.el-form-item__label {
  font-weight: 600;
  color: #334155;
}
.el-input__inner,
.el-select .el-input__inner {
  border-radius: 8px;
}
.button-row {
  display: flex;
  justify-content: center;
  margin-top: 18px;
}
.button-row .el-button {
  min-width: 160px;
  border-radius: 8px;
}

@media (max-width: 720px) {
  .form-row {
    flex-direction: column;
  }
}
</style>
