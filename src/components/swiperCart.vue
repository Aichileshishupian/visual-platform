<template>
  <el-carousel 
  :interval="4000" 
  type="card" 
 >
    <el-carousel-item  
      v-for="(item, index) in showList"
      :key="item.id"
    >
     <div class="carousel-item">
        <img :src="item.imageUrl" class="carousel-img" />
        <div class="info">
            <h3>TOP {{ index + 1 }}</h3>
            <span>{{ item.title }}</span>
            <p>
              <span>{{ item.description }}</span>
            </p>

            <div class="actions">
              <div class="item-like" @click.stop="workStore.toggleLike(item.id)" :class="{active: item.isLiked}">
                <span v-if="!item.isLiked">♡</span>
                <span v-else>♥</span>
                <span>{{ item.likeCount }}</span>
              </div>
              <div class="item-collect" @click.stop="workStore.toggleCollect(item.id)" :class="{active: item.isCollected}">
                <span v-if="!item.isCollected">☆</span>
                <span v-else>★</span>
                <span>{{ item.collectCount }}</span>
              </div>
            </div>

       </div>
    </div>

    </el-carousel-item>
  </el-carousel>
</template>



<script setup>
import { computed } from 'vue';
import { useWorksStore } from '@/stores/workstore.js';
const props = defineProps({
  worklist: {
    type: Array,
    required: true,
    default: () => []
  }
});

//依据点赞数排序
const sortedList = computed(() => {
  return props.worklist.slice().sort((a, b) => b.likeCount - a.likeCount);
});
//取前5个
const showList = computed(() => {
   console.log('✅ showList:', showList.value);
  return sortedList.value.slice(0, 5)

})

const workStore = useWorksStore();

</script>

<style scoped>
:deep(.el-carousel__item) {
  background: transparent !important;
}
.carousel-item {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 图片：统一裁剪，填满容器，无留白 */
.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 关键：等比例裁剪，填满容器，不拉伸 */
  transition: transform 0.3s ease;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 20px;
  margin: 0;
  text-align: center;
}
.info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.456);
  
}
.info p {
  margin: 0;
  font-size: 14px;
  display: flex;
  gap: 20px; /* 标签之间的空隙 */
}
.info p span {
  display: flex;
  justify-content: flex-end;
  gap: 4px; /* 符号和数字之间的空隙 */
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.actions {
  display: flex;
  justify-content: flex-start;
  gap: 20px; /* 点赞和收藏之间的空隙 */
}

.item-like.active {
  color: #ff4757;
}

.item-collect.active {
  color: #ffae00;
}
</style>





