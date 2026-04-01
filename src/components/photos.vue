<script  setup>
import { ref, watch } from 'vue';

import { useWorksStore } from '@/stores/workstore.js';

// 1. 正确定义props：接收父组件传的单个作品数据
const props = defineProps({
  photo: {
    type: Object,
    required: true,
    // 给默认值，防止报错
    default: () => ({
      id: 0,
      imageUrl: '',
      likeCount: 0,
      collectCount: 0,
      title: '默认标题',
      description: '默认描述',
    })
  }
});

const worksStore = useWorksStore();
</script>

<template>
  <div class="image-card">
    <!-- 图片 -->
    <el-image
      :src="photo.imageUrl"
      :preview-src-list="[photo.imageUrl]"
      fit="cover"
      :zoom-rate="1.2"
      :max-scale="7"
      :min-scale="0.2"
      show-progress
      preview-teleported
    />

    <!-- 悬浮层 -->
    <div class="hover-layer">
       <div class="info">
        <div class="title">{{ photo.title }}</div>
        <p class="desc">{{ photo.description }}</p>
      </div>
      <!-- 右下角点赞 + 收藏 -->
      <div class="actions">
        <div class="item-like" @click.stop="worksStore.toggleLike(photo.id)" :class="{active: photo.isLiked}">
           <span v-if="!photo.isLiked">♡</span>
           <span v-else>♥</span>
          <span>{{ photo.likeCount }}</span>
        </div>
        <div class="item-collect" @click.stop="worksStore.toggleCollect(photo.id)" :class="{active: photo. isCollected}">
           <span v-if="!photo.isCollected">☆</span>
           <span v-else>★</span>
          <span>{{ photo.collectCount }}</span>
        </div>
      </div>
    </div>

  </div>
</template>



<style scoped>
/* 卡片容器 */
.image-card {
  position: relative;
  width: 100%;
  margin-bottom: 12px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
}

/* 图片铺满 */
.image-card .el-image {
  width: 100%;
  height: auto;
  display: block;
}

/* 悬浮半透明遮罩 */
.hover-layer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
  color: #fff;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  opacity: 0;
  transition: opacity 0.3s;
   box-sizing: border-box; /* 修复内边距导致的宽度溢出 */
}

/* 鼠标悬浮显示 */
.image-card:hover .hover-layer {
  opacity: 1;
}

/* 左下角标题 */
.info {
  margin-bottom: 10px;
}

.title {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
}

.desc {
  font-size: 12px;
  opacity: 0.9;
  margin: 0;
}

/* 右侧图标容器 */
.actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

.item {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.item:hover {
  transform: scale(1.1);
}

.item-like.active {
  color: #ff4757;
}

.item-collect.active {
  color: #ffae00;
}

</style>