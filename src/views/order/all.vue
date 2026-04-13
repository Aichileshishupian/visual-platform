<template>
  <div>
    <div class="filter-row">
      <el-input v-model="q" placeholder="关键字搜索" clearable style="width:48%" />
      <el-select v-model="status" placeholder="状态" clearable style="width:24%">
        <el-option label="全部" :value="''" />
        <el-option label="待处理" :value="'pending'" />
        <el-option label="已完成" :value="'finished'" />
      </el-select>
      <el-button type="primary" @click="fetchList">刷新</el-button>
    </div>

    <div class="list">
      <el-card v-for="it in orderList" :key="it.id || it._id" class="order-card">
        <div class="order-row">
          <div>
            <div><strong>订单ID：</strong>{{ it.id || it._id }}</div>
            <div><strong>买家：</strong>{{ it.username || it.buyer || '匿名' }}</div>
            <div><strong>联系电话：</strong>{{ it.telephone || '—' }}</div>
            <div><strong>预算：</strong><el-tag>{{ it.budget || it.price || '面议' }}</el-tag></div>
          </div>
          <div class="order-actions">
            <div><strong>状态：</strong><el-tag>{{ it.status || 'unknown' }}</el-tag></div>
            <el-button v-if="it.status !== 'finished'" size="small" @click="markFinished(it)">标记完成</el-button>
          </div>
        </div>
        <div class="desc">{{ it.description || '无详情' }}</div>
      </el-card>
    </div>

    <div class="pager">
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        :total="total"
        :page-size="pageSize"
        :current-page.sync="page"
        @current-change="onPageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useOrderStore } from '@/stores/orderstore.js'

const store = useOrderStore()

const props = defineProps({ filterStatus: { type: String, default: '' } })

const page = ref(1)
const pageSize = ref(8)
const total = ref(0)

const status = ref(props.filterStatus || '')
const q = ref('')

const orderList = computed(() => store.orderList)

const fetchList = async () => {
  try {
    const params = { page: page.value, size: pageSize.value, status: status.value, q: q.value }
    const res = await store.fetchOrderList(params)
    if (res && (res.total || res.count)) total.value = res.total || res.count
    else total.value = store.orderList.length || 0
  } catch (err) {
    console.error('加载订单失败', err)
    if (!store.orderList.length) {
      store.orderList = [
        { id: 1, username: '示例', telephone: '18100001111', budget: '面议', description: '示例订单', status: 'pending' }
      ]
      total.value = store.orderList.length
    }
  }
}

onMounted(() => fetchList())

watch([page, pageSize, status, q], () => fetchList())

const onPageChange = (p) => { page.value = p }

const markFinished = async (it) => {
  try {
    await store.updateOrderStatus(it.id || it._id, 'finished')
    // 本地提示
    // 重新拉取或依赖 store 的同步
  } catch (err) {
    console.error('标记完成失败', err)
  }
}
</script>

<style scoped>
.filter-row { display:flex; gap:12px; margin-bottom:12px }
.order-card { margin-bottom:12px }
.order-row { display:flex; justify-content:space-between; align-items:flex-start }
.order-actions { display:flex; flex-direction:column; gap:8px; align-items:flex-end }
.desc { margin-top:8px }
.pager { display:flex; justify-content:center; margin-top:20px }
</style>
