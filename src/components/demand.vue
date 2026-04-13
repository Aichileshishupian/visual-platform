<template>
  <el-descriptions
    class="margin-top"
    :column="3"
    :size="size"
    border
  >
    <template #extra>
      <el-button type="primary" size="small">接受</el-button>
    </template>

    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <User />
          </el-icon>
          发布者
        </div>
      </template>
      {{ item?.username || '匿名' }}
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <Iphone />
          </el-icon>
          联系电话
        </div>
      </template>
      {{ item?.telephone || '—' }}
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <Location />
          </el-icon>
          地点
        </div>
      </template>
      {{ item?.place || item?.location || '不限' }}
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <Tickets />
          </el-icon>
          预算
        </div>
      </template>
      <el-tag size="small">{{ item?.budget || '面议' }}</el-tag>
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <OfficeBuilding />
          </el-icon>
          需求类型
        </div>
      </template>
      {{ item?.type || '—' }}
    </el-descriptions-item>
     <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <OfficeBuilding />
          </el-icon>
          详情
        </div>
      </template>
      {{ item?.description || '—' }}
    </el-descriptions-item>
  </el-descriptions>
  
</template>

<script setup>
import { computed, ref } from 'vue'
import {
  Iphone,
  Location,
  OfficeBuilding,
  Tickets,
  User,
} from '@element-plus/icons-vue'

const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  }
})

const size = ref('default')

const iconStyle = computed(() => {
  const marginMap = {
    large: '8px',
    default: '6px',
    small: '4px',
  }
  return {
    marginRight: marginMap[size.value] || marginMap.default,
  }
})
</script>

<style scoped>
.el-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 20px;
}
</style>