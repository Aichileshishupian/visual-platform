<script setup>
import { ref, onMounted ,computed} from 'vue';
import Photos from '@/components/photos.vue';
import SwiperCart from '../../components/swiperCart.vue';
import { getWorksListService } from '@/api/worksApi.js';
import { useWorksStore } from '@/stores/workstore.js';

const workStore = useWorksStore()

onMounted(() => {
  workStore.getWorksList()
  console.log('✅ 父组件拿到数据了:', workStore.workList);
})

// 按点赞数排序（给轮播用）
const sortedList = computed(() => {
  return [...workStore.workList].sort((a, b) => b.likeCount - a.likeCount)
})
</script>

<template>
  <div class="swiper">
    <!-- 传给轮播图的数据 -->
    <SwiperCart :worklist="workStore.workList" />
  </div>

  <!-- 瀑布流容器：只放一个，v-for放在内部 -->
  <div class="waterfall-container">
    <!-- v-for遍历作品列表，给每个Photos传完整的photo对象 -->
    <Photos
      v-for="item in workStore.workList"
      :key="item.id"
      :photo="item"
    />
  </div>
</template>

<style scoped>
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