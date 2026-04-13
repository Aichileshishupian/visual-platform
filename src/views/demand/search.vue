<template>
  <div>
    <div class="filter-row">
      <el-input v-model="keyword" placeholder="关键字搜索" clearable style="width:36%" />
      <el-select v-model="type" placeholder="需求类型" clearable style="width:28%">
        <el-option v-for="o in options" :key="o.value" :label="o.label" :value="o.value" />
      </el-select>
      <el-select v-model="location" placeholder="地点" clearable style="width:28%">
        <el-option v-for="o in localoptions" :key="o.value" :label="o.label" :value="o.value" />
      </el-select>
    </div>

    <el-skeleton :loading="loading" animated>
      <div>
        <template v-if="filteredList && filteredList.length">
          <demand v-for="it in filteredList" :key="it.id || it._id" :item="it" />
        </template>
        <template v-else>
          <div class="empty-list">
            <el-empty description="未找到匹配的需求" />
          </div>
        </template>
      </div>
    </el-skeleton>

    <div class="pager">
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        :total="total"
        :page-size="pageSize"
        v-model:current-page="page"
        @current-change="onPageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref, watch } from 'vue'
import demand from '@/components/demand.vue'
import { useDemandStore } from '@/stores/demandstore.js'

const store = useDemandStore()

const page = ref(1)
const pageSize = ref(5)
const loading = ref(false)

const type = ref('')
const location = ref('')
const keyword = ref('')

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

// ==============================================
// 🔥 核心：前端自动筛选（搜索 + 类型 + 地点）
// ==============================================
const filteredList = computed(() => {
  let list = store.demandList || []

  // 1. 关键字搜索（标题/描述/用户名 都能搜）
  if (keyword.value) {
    const k = keyword.value.toLowerCase()
    list = list.filter(it => 
      (it.title?.toLowerCase().includes(k)) ||
      (it.description?.toLowerCase().includes(k)) ||
      (it.username?.toLowerCase().includes(k))
    )
  }

  // 2. 需求类型筛选
  if (type.value) {
    list = list.filter(it => it.type === type.value)
  }

  // 3. 地点筛选
  if (location.value) {
    list = list.filter(it => 
      it.place === location.value || it.location === location.value
    )
  }

  return list
})

// ==============================================
// 分页列表（从筛选后的结果里分页）
// ==============================================
const demandList = computed(() => {
  const start = (page.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredList.value.slice(start, end)
})

// ==============================================
// 总条数自动更新
// ==============================================
const total = computed(() => filteredList.value.length)

const fetchList = async () => {
  loading.value = true
  try {
    await store.fetchDemandList()
  } catch (err) {
    console.error('加载失败', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => fetchList())

// 搜索防抖
let timer = null
watch([keyword, type, location], () => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    page.value = 1
  }, 300)
})

const onPageChange = (p) => {
  page.value = p
}
</script>

<style>
.filter-row {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}
.pager {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>