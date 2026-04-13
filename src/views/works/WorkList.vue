<script setup>
import { ref, computed } from 'vue';
import Photos from '@/components/photos.vue';
import SwiperCart from '../../components/swiperCart.vue';
import { useWorksStore } from '@/stores/workstore.js';

const workStore = useWorksStore();

// 搜索与筛选
const worktitle = ref('');
const select = ref('');

const options = ref([
  { value: '', label: '全部风格' },
  { value: '自然风光', label: '自然风光' },
  { value: '海边风景', label: '海边风景' },
  { value: '森林风光', label: '森林风光' },
  { value: '雪山湖泊', label: '雪山湖泊' },
  { value: '田园风光', label: '田园风光' },
  { value: '古镇风景', label: '古镇风景' },
  { value: '草原星空', label: '草原星空' },
  { value: '山水瀑布', label: '山水瀑布' },
  { value: '花海风景', label: '花海风景' },
  { value: '峡谷风光', label: '峡谷风光' },
  { value: '治愈', label: '治愈' },
  { value: '高级', label: '高级' },
  { value: '浪漫', label: '浪漫' },
  { value: '清新', label: '清新' },
  { value: '写实', label: '写实' },
  { value: '自然', label: '自然' },
  { value: '文艺', label: '文艺' },
  { value: '国风', label: '国风' }
]);

// 筛选后的作品列表
const filteredWorks = computed(() => {
  let list = [...workStore.workList];

  // 标题搜索
  if (worktitle.value.trim()) {
    const keyword = worktitle.value.toLowerCase();
    list = list.filter(work =>
      work.title?.toLowerCase().includes(keyword)
    );
  }

  // 风格筛选
  if (select.value) {
    list = list.filter(work =>
      work.style && work.style.includes(select.value)
    );
  }

  return list;
});

// 轮播使用：按点赞数排序
const sortedList = computed(() => {
  return [...filteredWorks.value].sort((a, b) => b.likeCount - a.likeCount);
});
</script>

<template>
   <section class="site-hero">
    <div class="hero-inner">
        <h1 class="hero-title">光迹视觉・为每一份创作赋予光芒</h1>   
    <div class="hero-search">
      <input
        v-model="worktitle"
        type="text"
        placeholder="搜索作品标题..."
      />
     
    
      <select v-model="select" class="style-select">
        <option v-for="item in options" :key="item.value" :value="item.value">
          {{ item.label }}
        </option>
      </select>
       <button class="search-btn">🔍</button>
    </div>
    </div>
    </section>
  <div class="works-page">
    <!-- 搜索筛选栏 -->
   

    <!-- 轮播图（热门推荐） -->
    <div class="swiper-section">
      <SwiperCart :worklist="sortedList" />
    </div>

    <!-- 瀑布流图片列表 -->
    <div class="waterfall-container">
      <Photos v-for="item in filteredWorks" :key="item.id" :photo="item" />
    </div>
  </div>
</template>

<style scoped>
/* 整体页面 */
.works-page {
  max-width: 1400px;
  margin: 0 auto;
}

/* 搜索筛选栏 */
.search-filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  flex-wrap: wrap;
  gap: 12px;
}

/* 胶囊搜索框 */
.search-pill {
  display: inline-flex;
  align-items: center;
  background: #fff;
  border-radius: 40px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(2,6,23,0.06);
  width: 620px;
  max-width: 100%;
}

.search-pill input {
  flex: 1;
  border: none;
  padding: 14px 20px;
  font-size: 16px;
  outline: none;
  color: #333;
}

.search-pill input::placeholder {
  color: #cfcfd3;
}

.search-btn {
  background: #ff9ac1;
  color: #fff;
  border: none;
  width: 64px;
  height: 48px;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 下拉选择框 */
.style-select {
  height: 48px;
  padding: 0 16px;
  border: 1px solid #eee;
  border-radius: 12px;
  font-size: 15px;
  outline: none;
  min-width: 160px;
}
/* 顶部 Hero 大图区域 + 背景图 */
.site-hero {
  position: relative;
  width: 100%;
  min-height: 460px;
  /* 👇 这里放你的背景图路径 */
  background-image: url("@/assets/backimage.png");
  background-size: cover;       /* 铺满 */
  background-position: center;  /* 居中 */
  background-repeat: no-repeat; /* 不重复 */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 16px; /* 圆角更美观 */
  overflow: hidden;
}

/* 黑色渐变遮罩（让文字更清晰） */
.site-hero::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6));
  z-index: 1;
}

/* 内容层（在遮罩上方） */
.hero-inner {
  position: relative;
  z-index: 2;
  text-align: center;
  color: #fff;
  width: 100%;
  max-width: 720px;
}

.hero-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 24px;
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

/* 搜索条 */
.hero-search {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 50px;
  padding: 6px 6px 6px 18px;
  margin-bottom: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

.hero-search input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  padding: 10px 0;
}

.search-btn {
  background: #ff4757;
  color: white;
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
}
/* 轮播区域 */
.swiper-section {
  padding: 20px;
}

/* 瀑布流布局 */
.waterfall-container {
  column-count: 3;
  column-gap: 16px;
  padding: 20px;
   height: fit-content !important;
}
.photo-card img {
  width: 100%;
  height: auto;
  min-height: 180px; /* 防止特别矮的图 */
}

/* 移动端适配 */
@media (max-width: 768px) {
  .waterfall-container {
    column-count: 2;
  }
}

@media (max-width: 480px) {
  .waterfall-container {
    column-count: 1;
  }
}
</style>