<template>
  <!-- 1. 给 echarts 一个容器，必须设置宽高！ -->
  <div ref="chartRef" style="width: 100%; height: 400px;"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// 引入 echarts
import * as echarts from 'echarts'

// 2. 获取 DOM 节点
const chartRef = ref(null)

// 3. 页面渲染完成后初始化图表
onMounted(() => {
  const myChart = echarts.init(chartRef.value)

  // 4. 配置项
  const option = {
    title: { text: '作品数据统计' },
    xAxis: { type: 'category', data: ['周一', '周二', '周三', '周四', '周五'] },
    yAxis: { type: 'value' },
    series: [
      {
        data: [10, 20, 30, 50, 40],
        type: 'line' // 折线图，换成 bar 就是柱状图
      }
    ]
  }

  // 5. 渲染
  myChart.setOption(option)
})
</script>