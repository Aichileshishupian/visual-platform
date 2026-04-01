<script lang="ts" setup>

import { ref } from 'vue';

const url = 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'

const isLiked =ref(false)
const LikeCount = ref(0)
const isCollected = ref(false)
const CollectCount = ref(0)

const toggleLike = () => {
  isLiked.value = !isLiked.value
  LikeCount.value = isLiked.value ? LikeCount.value + 1 : LikeCount.value - 1 
}
const toggleCollect = () => {
  isCollected.value = !isCollected.value
  CollectCount.value = isCollected.value ? CollectCount.value + 1 : CollectCount.value - 1 

}
  

</script>



<template>
  <div class="image-card">
    <!-- 图片 -->
    <el-image
      :src="url"
      :preview-src-list="[url]"
      fit="cover"
      :zoom-rate="1.2"
      :max-scale="7"
      :min-scale="0.2"
      show-progress
    />

    <!-- 悬浮层 -->
    <div class="hover-layer">
      <!-- 左下角标题 -->
      <div class="title">图片标题</div>

      <!-- 右下角点赞 + 收藏 -->
      <div class="actions">
        <div class="item" @click.stop="toggleLike" :class="{active: isLiked}">
          <Heart v-if="!isLiked" />
          <HeartFilled v-if="isLiked" /> 
          <span>{{ LikeCount }}</span>
        </div>
        <div class="item" @click.stop="toggleCollect" :class="{active: isCollected}">
          <StarFilled v-if="isCollected" />
          <Star v-else />
          <span>{{ CollectCount }}</span>
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
.title {
  font-size: 14px;
  font-weight: 500;
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

.item.active {
  color: #ff4757;
}
</style>