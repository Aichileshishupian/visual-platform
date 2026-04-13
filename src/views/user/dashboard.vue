<template>
  <div>
    <div class="stat-row">
      <el-card class="stat-card">
        <div>作品数</div>
        <div class="stat-value">{{ workCount }}</div>
      </el-card>
      <el-card class="stat-card">
        <div>需求数</div>
        <div class="stat-value">{{ demandCount }}</div>
      </el-card>
      <el-card class="stat-card">
        <div>订单数</div>
        <div class="stat-value">{{ orderCount }}</div>
      </el-card>
    </div>

    <div class="chart-area">
      <div class="double-charts single-row">
        <div class="half" ref="worksChartRef" style="height:420px"></div>
        <div class="half" ref="demandChartRef" style="height:420px"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed, watch } from 'vue'
import * as echarts from 'echarts'
import { useWorksStore } from '@/stores/workstore.js'
import { useDemandStore } from '@/stores/demandstore.js'
import { useOrderStore } from '@/stores/orderstore.js'

const worksStore = useWorksStore()
const demandStore = useDemandStore()
const orderStore = useOrderStore()

const workCount = computed(() => worksStore.workList.length)
const demandCount = computed(() => demandStore.demandList.length)
const orderCount = computed(() => orderStore.orderList.length)

const worksChartRef = ref(null)
const demandChartRef = ref(null)

let worksChart = null
let demandChart = null

let resizeHandler = null

onMounted(async () => {
  await nextTick()
  // 尝试拉取最新数据（若后端可用）
  try { await demandStore.fetchDemandList() } catch (e) { }
  try { await orderStore.fetchOrderList() } catch (e) { }

  if (worksChartRef.value) worksChart = echarts.init(worksChartRef.value)
  if (demandChartRef.value) demandChart = echarts.init(demandChartRef.value)

  // 初始化作品风格占比图
  const buildWorksData = () => {
    const map = new Map()
    worksStore.workList.forEach((w) => {
      const styles = Array.isArray(w.style) ? w.style : (w.style ? [w.style] : ['未分类'])
      styles.forEach((s) => {
        const key = s || '未分类'
        map.set(key, (map.get(key) || 0) + 1)
      })
    })
    const data = Array.from(map.entries()).map(([name, value]) => ({ name, value }))
    return data.length ? data : [{ name: '无数据', value: 1 }]
  }

  const worksOption = {
    title: { text: '作品风格占比', left: 'center' },
    tooltip: { trigger: 'item' },
    legend: { bottom: 6 },
    series: [
      { type: 'pie', radius: ['40%', '70%'], label: { show: false }, data: buildWorksData() }
    ]
  }
  worksChart?.setOption(worksOption)

  // 初始化需求分类占比图
  const buildDemandData = () => {
    const map = new Map()
    demandStore.demandList.forEach((d) => {
      const key = d.type || '未分类'
      map.set(key, (map.get(key) || 0) + 1)
    })
    const data = Array.from(map.entries()).map(([name, value]) => ({ name, value }))
    return data.length ? data : [{ name: '无数据', value: 1 }]
  }

  const demandOption = {
    title: { text: '需求分类占比', left: 'center' },
    tooltip: { trigger: 'item' },
    legend: { bottom: 6 },
    series: [
      { type: 'pie', radius: ['40%', '70%'], label: { show: false }, data: buildDemandData() }
    ]
  }
  demandChart?.setOption(demandOption)

  // 窗口调整
  resizeHandler = () => {
    worksChart?.resize()
    demandChart?.resize()
  }
  window.addEventListener('resize', resizeHandler)

  // 监听 store 变化，动态更新图表数据
  watch(() => worksStore.workList, () => {
    try { worksChart?.setOption({ series: [{ data: (function(){ const m=new Map(); worksStore.workList.forEach(w=>{ const styles=Array.isArray(w.style)?w.style:(w.style?[w.style]:['未分类']); styles.forEach(s=>{ const k=s||'未分类'; m.set(k,(m.get(k)||0)+1) })}); const data=Array.from(m.entries()).map(([name,value])=>({name,value})); return data.length?data:[{name:'无数据',value:1}] })() }] }) } catch(e){}
  }, { deep: true })

  watch(() => demandStore.demandList, () => {
    try { demandChart?.setOption({ series: [{ data: (function(){ const m=new Map(); demandStore.demandList.forEach(d=>{ const k=d.type||'未分类'; m.set(k,(m.get(k)||0)+1) }); const data=Array.from(m.entries()).map(([name,value])=>({name,value})); return data.length?data:[{name:'无数据',value:1}] })() }] }) } catch(e){}
  }, { deep: true })
})

onUnmounted(() => {
  myChart?.dispose()
  worksChart?.dispose()
  demandChart?.dispose()
  myChart = null
  worksChart = null
  demandChart = null
  if (resizeHandler) window.removeEventListener('resize', resizeHandler)
})
</script>

<style scoped>
.stat-row { display:flex; gap:16px; margin-bottom:16px }
.stat-card { flex:1; text-align:center }
.stat-value { font-size:28px; margin-top:8px }
.chart-area { border:1px solid #e6e6e6; padding:8px; border-radius:6px }
</style>