<template>
  <div class="container">
    <Swiper
      :modules="[EffectCoverflow, Pagination, Navigation]"
      effect="coverflow"
      :centeredSlides="true"
      :slidesPerView="'auto'"
      :loop="false"
      :grabCursor="true"
      v-model:active-index="activeIndex"
      :watchSlidesProgress="true"
      @slideChange="onSlideChange"
      :coverflowEffect="{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true
      }"
      :navigation="true"
      :pagination="{ clickable: true }"
      class="my-swiper"
    >
      <!-- 有作品才显示轮播 -->
      <SwiperSlide
        v-for="item in myworks"
        :key="item.id"
        class="my-slide"
      >
        <img :src="item.imageUrl" alt="作品" />
      </SwiperSlide>
    </Swiper>

    <!-- 🔥 无作品时显示：暂无作品 -->
    <div v-if="myworks.length === 0" class="empty">
      <div class="empty-text">暂无作品</div>
    </div>

    <!-- 对应显示当前轮播的作品信息（有作品才显示） -->
    <div v-else>
      <div v-if="currentWork" class="info">
        <h3>作品标题：{{ currentWork.title }}</h3>
        <p class="tags">{{ currentWork.style.join(', ') }}</p>
        <p class="desc">作品描述：{{ currentWork.description }}</p>
        <div class="stats">
          <p class="stat collect"><span>★</span> 收藏：{{ currentWork.collectCount }}</p>
          <p class="stat like"><span>♥</span> 点赞：{{ currentWork.likeCount }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useWorksStore } from '@/stores/workstore.js'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const workStore = useWorksStore()

const excludeIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const myworks = computed(() =>
  workStore.workList.filter(item => !excludeIds.includes(item.id))
)

const activeIndex = ref(0)

const onSlideChange = (swiper) => {
  activeIndex.value = swiper.activeIndex
}

const currentWork = computed(() => {
  if (myworks.value.length && activeIndex.value >= 0 && activeIndex.value < myworks.value.length) {
    return myworks.value[activeIndex.value]
  }
  return null
})

watch(activeIndex, (newIndex) => {
  console.log('当前索引:', newIndex, '当前作品:', currentWork.value?.title)
})

watch(myworks, (newWorks) => {
  if (newWorks.length && activeIndex.value >= newWorks.length) {
    activeIndex.value = 0
  }
}, { immediate: true })
</script>

<style scoped>
.container {
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 16px;
  overflow: hidden;
  position: relative;
  color: #2b2b2b;
}
.my-swiper {
  width: 100%;
  padding: 28px 0 48px 0;
  overflow: visible;
}
.my-slide {
  width: 380px !important;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.swiper-slide img {
  display: block;
  width: 100%;
  height: 340px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(36,40,46,0.12);
  transition: transform 0.28s cubic-bezier(.2,.9,.2,1), box-shadow 0.28s;
  cursor: pointer;
}
.swiper-slide img:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 18px 40px rgba(36,40,46,0.16);
}

/* 导航按钮样式 */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  width: 44px;
  height: 44px;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0 6px 18px rgba(33,37,41,0.06);
  display: flex;
  align-items: center;
  justify-content: center;
}
:deep(.swiper-button-next:after),
:deep(.swiper-button-prev:after) {
  font-size: 16px;
  color: #444;
}

/* 分页样式微调 */
:deep(.swiper-pagination) {
  bottom: 8px !important;
}
:deep(.swiper-pagination-bullet) {
  width: 8px;
  height: 8px;
  background: #c4cdd8;
  opacity: 1;
  transition: all 0.25s ease;
}
:deep(.swiper-pagination-bullet-active) {
  width: 20px;
  border-radius: 10px;
  background: linear-gradient(90deg, #4f46e5, #06b6d4);
  box-shadow: 0 6px 18px rgba(79,70,229,0.18);
}

.info {
  margin-top: 16px;
  padding: 18px;
  display: grid;
  grid-template-columns: 1fr 180px;
  gap: 12px;
  align-items: start;
  background: linear-gradient(180deg, rgba(59,130,246,0.03), rgba(255,255,255,0));
  border-radius: 12px;
  border: 1px solid rgba(59,130,246,0.06);
}
.info h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
  color: #0f172a;
  font-weight: 600;
}
.info p {
  margin: 6px 0;
  color: #475569;
  font-size: 14px;
  line-height: 1.6;
}

/* 描述：限制行数并优雅截断 */
.info .desc {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 风格行：更像标签容器，允许换行 */
.info .tags {
  background: rgba(99,102,241,0.06);
  padding: 8px 10px;
  border-radius: 10px;
  color: #0f172a;
  font-size: 13px;
  margin: 8px 0 0 0;
  word-break: break-word;
}

/* 统计数字列 */
.info .stat {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: flex-start;
  margin: 6px 0 0 0;
  font-weight: 500;
}
.info .stat span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  font-size: 14px;
  color: #fff;
}
.info .stat.like span {
  background: linear-gradient(90deg,#ff6b6b,#ff4d6d);
}
.info .stat.collect span {
  background: linear-gradient(90deg,#f59e0b,#f97316);
}

/* 将收藏和点赞并排放置，位于右侧列 */
.info .stats {
  grid-column: 2;
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: flex-end;
}

@media (max-width: 600px) {
  .info .stats {
    grid-column: 1;
    justify-content: flex-start;
    margin-top: 8px;
  }
}

@media (max-width: 600px) {
  .info {
    grid-template-columns: 1fr;
  }
  .info p:nth-of-type(3), .info p:nth-of-type(4) {
    justify-content: flex-start;
  }
}

/* 暂无作品 优化显示 */
.empty {
  padding: 48px 20px;
  text-align: center;
}
.empty-text {
  display: inline-block;
  font-size: 15px;
  color: #9aa4b2;
  padding: 14px 20px;
  border-radius: 10px;
  background: #f6f9fc;
}
.empty-text::before {
  content: "📭";
  display: inline-block;
  margin-right: 8px;
}

@media (max-width: 992px) {
  .my-slide {
    width: 320px !important;
  }
  .swiper-slide img {
    height: 300px;
  }
}

@media (max-width: 600px) {
  .container {
    padding: 24px 12px;
  }
  .my-slide {
    width: 240px !important;
  }
  .swiper-slide img {
    height: 220px;
    border-radius: 10px;
  }
  .info {
    padding: 14px 10px;
  }
}
</style>