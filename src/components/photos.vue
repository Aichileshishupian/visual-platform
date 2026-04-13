<script setup>
import { useWorksStore } from '@/stores/workstore.js';

const props = defineProps({
  photo: {
    type: Object,
    required: true,
    default: () => ({
      id: 0,
      imageUrl: '',
      likeCount: 0,
      collectCount: 0,
      title: '默认标题',
      description: '默认描述',
      isLiked: false,
      isCollected: false
    })
  }
});

const worksStore = useWorksStore();
</script>

<template>
  <div class="image-card">
    <el-image
      :src="photo.imageUrl"
      :preview-src-list="[photo.imageUrl]"
      fit="cover"
      :zoom-rate="1.2"
      :max-scale="7"
      :min-scale="0.2"
      preview-teleported
    />

    <div class="hover-layer">
      <div class="info">
        <div class="title">{{ photo.title }}</div>
        <p class="desc">{{ photo.description }}</p>
      </div>

      <div class="actions">
        <div class="item-like" @click.stop="worksStore.toggleLike(photo.id)" :class="{ active: photo.isLiked }">
          <span v-if="!photo.isLiked">♡</span>
          <span v-else>♥</span>
          <span>{{ photo.likeCount }}</span>
        </div>

        <div class="item-collect" @click.stop="worksStore.toggleCollect(photo.id)" :class="{ active: photo.isCollected }">
          <span v-if="!photo.isCollected">☆</span>
          <span v-else>★</span>
          <span>{{ photo.collectCount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 🔥 关键修复：删除 height:300px，让高度由图片自动撑开 */
.image-card {
  position: relative;
  width: 100%;
  /* 去掉了固定高度 height:300px */
  margin-bottom: 14px;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  background: #0f1724;
}

/* 图片高度由自身比例决定 → 自然错落 */
.image-card .el-image {
  width: 100%;
  height: auto;
  display: block;
}

.hover-layer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent 60%);
  color: #fff;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  opacity: 0;
  transition: all 0.28s;
  box-sizing: border-box;
}

.image-card:hover .hover-layer {
  opacity: 1;
}

.info {
  margin-bottom: 10px;
}

.title {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 6px;
}

.desc {
  font-size: 13px;
  opacity: 0.92;
  margin: 0;
  max-height: 38px;
  overflow: hidden;
}

.actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

.item-like,
.item-collect {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.item-like.active {
  color: #ff4757;
}
.item-collect.active {
  color: #ffae00;
}

/* 动画效果保留 */
.image-card {
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.04);
  box-shadow: 0 10px 30px rgba(2,6,23,0.22);
  transition: transform 0.35s, box-shadow 0.35s;
}

.image-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 28px 60px rgba(2,6,23,0.4);
}
</style>