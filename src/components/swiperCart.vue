<template>
  <el-carousel :interval="4000" type="card">
    <el-carousel-item v-for="item in showList" :key="item.id">
      <div class="carousel-item">
        <img :src="item.imageUrl" class="carousel-img" />

        <!-- 排名 -->
        <div class="rank-badge">TOP {{ showList.indexOf(item) + 1 }}</div>

        <!-- 底部信息 -->
        <div class="overlay">
          <div class="overlay-left">
            <div class="title">{{ item.title }}</div>
            <div class="desc">{{ item.description }}</div>
          </div>

          <div class="overlay-right">
            <div class="stat" @click.stop="workStore.toggleLike(item.id)" :class="{active: item.isLiked}">
              <span>{{ item.isLiked ? '♥' : '♡' }}</span>
              <span>{{ item.likeCount }}</span>
            </div>
            <div class="stat" @click.stop="workStore.toggleCollect(item.id)" :class="{active: item.isCollected}">
              <span>{{ item.isCollected ? '★' : '☆' }}</span>
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
    default: () => []
  }
});

// 排序 + 取前5
const showList = computed(() => {
  return [...props.worklist]
    .sort((a, b) => b.likeCount - a.likeCount)
    .slice(0, 5);
});

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
}

.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 排名 */
.rank-badge {
  position: absolute;
  right: 12px;
  top: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  background: #ffd700;
  color: #333;
  font-weight: bold;
  z-index: 10;
}

/* 底部遮罩 */
.overlay {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: end;
  background: linear-gradient(transparent, rgba(0,0,0,.5));
  color: #fff;
  z-index: 5;
}

.title {
  font-size: 16px;
  font-weight: bold;
}
.desc {
  font-size: 12px;
  opacity: .9;
}

.overlay-right {
  display: flex;
  gap: 10px;
}
.stat {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
}
.stat.active {
  color: #ff4757;
}

/* 中间卡片放大 */
:deep(.el-carousel__item.is-active) .carousel-item {
  transform: scale(1.05);
}
</style>