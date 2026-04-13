<template>
  <div>
    <h3>待处理订单</h3>
    <all-orders :filter-status="'pending'" />
  </div>
</template>

<script setup>
import AllOrders from './all.vue'
const props = defineProps({})
</script>

<style scoped>
</style>
