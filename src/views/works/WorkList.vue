<script setup>
import Photos from '@/components/photos.vue'
import SwiperCart from '../../components/swiperCart.vue';
</script>

<template>
  <div class="swiper">
    <SwiperCart></SwiperCart>
  </div>
  <div class="waterfall-container">
    <Photos />
    <Photos />
    <Photos />
    <Photos />
    <Photos />
    <Photos />
  </div>
</template>

<style>
/* 小红书核心布局 */
.waterfall-container {
  column-count: 3; /* 3列布局 */
  column-gap: 16px; /* 列间距，控制空隙大小 */
  padding: 20px; /* 整体内边距 */
}

/* 关键：防止图片被截断 */
.waterfall-container > * {
  break-inside: avoid;
  margin-bottom: 16px; /* 行间距 */
}
</style>