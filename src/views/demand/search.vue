<template>
  <demand></demand>
  <demand></demand>
  <demand></demand>
  <demand></demand>
  <demand></demand>
  <el-pagination background layout="prev, pager, next" :total="1000" />
</template>

<script>
import demand from '@/components/demand.vue'  
export default {
  components: {
    demand
  }
}
</script>

<style>
.el-pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>