<template>
  <div>
    <h3>已完成订单</h3>
    <all-orders :filter-status="'finished'" />
  </div>
</template>

<script setup>
import AllOrders from './all.vue'
</script>

<style scoped>
</style>
