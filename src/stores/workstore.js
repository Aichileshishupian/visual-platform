import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getWorksListService } from '@/api/worksApi.js'

export const useWorksStore = defineStore('works', () => {
  // 全局作品列表 → 两个子组件共用这份数据
  const workList = ref([])

  // 获取作品数据
  const getWorksList = async () => {
    try {
      const res = await getWorksListService()
      workList.value = res
      console.log('获取作品列表成功', res)
    } catch (err) {
      console.error('获取作品失败', err)
    }
  }

  // 点赞 → 根据 id 修改对应作品
  const toggleLike = (id) => {
    const item = workList.value.find(it => it.id === id)
    if (!item) return

    item.isLiked = !item.isLiked
    item.likeCount += item.isLiked ? 1 : -1
  }

  // 收藏
  const toggleCollect = (id) => {
    const item = workList.value.find(it => it.id === id)
    if (!item) return

    item.isCollected = !item.isCollected
    item.collectCount += item.isCollected ? 1 : -1
  }

  //添加数据
  const addWork = (newWork) => {
    workList.value.unshift(newWork)
  }
  return {
    workList,
    getWorksList,
    toggleLike,
    toggleCollect,
    addWork
  }
}, {
  persist: true // 刷新不丢失
})