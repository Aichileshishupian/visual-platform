import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'

export const useWorksStore = defineStore('works', () => {
  // 初始数据
  const defaultWorkList = [
    {
      id: 1,
      imageUrl: "/src/assets/image1.png",
      likeCount: 248,
      collectCount: 136,
      title: "山间云海日出",
      description: "清晨山峰被云海环绕，日出金光铺满山间，壮阔又治愈",
      style: ["自然风光", "治愈", "高级"],
      isLiked: false,
      isCollected: false
    },
    {
      id: 2,
      imageUrl: "/src/assets/image2.png",
      likeCount: 356,
      collectCount: 189,
      title: "海边落日晚霞",
      description: "海平面落日染红天空，晚霞与海浪交映，浪漫至极",
      style: ["海边风景", "浪漫", "治愈"],
      isLiked: false,
      isCollected: false
    },
    {
      id: 3,
      imageUrl: "/src/assets/image3.png",
      likeCount: 189,
      collectCount: 97,
      title: "森林秘境晨光",
      description: "阳光穿过林间缝隙，雾气弥漫，宛如童话世界",
      style: ["森林风光", "清新", "治愈"],
      isLiked: false,
      isCollected: false
    },
    {
      id: 4,
      imageUrl: "/src/assets/image4.png",
      likeCount: 412,
      collectCount: 225,
      title: "雪山湖泊倒影",
      description: "清澈湖面倒映巍峨雪山，蓝天碧水，干净又震撼",
      style: ["雪山湖泊", "高级", "写实"],
      isLiked: false,
      isCollected: false
    },
    {
      id: 5,
      imageUrl: "/src/assets/image5.png",
      likeCount: 277,
      collectCount: 143,
      title: "梯田层层叠叠",
      description: "山间梯田如镜面般排列，绿意盎然，尽显田园之美",
      style: ["田园风光", "清新", "自然"],
      isLiked: false,
      isCollected: false
    },
    {
      id: 6,
      imageUrl: "/src/assets/image6.png",
      likeCount: 310,
      collectCount: 166,
      title: "古镇烟雨江南",
      description: "小桥流水人家，烟雨朦胧，尽显江南温婉韵味",
      style: ["古镇风景", "文艺", "国风"],
      isLiked: false,
      isCollected: false
    },
    {
      id: 7,
      imageUrl: "/src/assets/image7.png",
      likeCount: 228,
      collectCount: 114,
      title: "草原星空夜景",
      description: "辽阔草原上繁星满天，银河清晰可见，静谧辽阔",
      style: ["草原星空", "治愈", "浪漫"],
      isLiked: false,
      isCollected: false
    },
    {
      id: 8,
      imageUrl: "/src/assets/image8.png",
      likeCount: 385,
      collectCount: 203,
      title: "瀑布飞流直下",
      description: "高山瀑布水流奔腾，水雾缭绕，气势磅礴",
      style: ["山水瀑布", "自然风光", "写实"],
      isLiked: false,
      isCollected: false
    },
    {
      id: 9,
      imageUrl: "/src/assets/image9.png",
      likeCount: 196,
      collectCount: 89,
      title: "花海春日盛放",
      description: "漫山遍野鲜花盛开，色彩缤纷，春日氛围感拉满",
      style: ["花海风景", "清新", "治愈"],
      isLiked: false,
      isCollected: false
    },
    {
      id: 10,
      imageUrl: "/src/assets/image10.png",
      likeCount: 443,
      collectCount: 251,
      title: "峡谷碧水青山",
      description: "峡谷间碧绿江水蜿蜒，两岸青山对峙，绝美山水画",
      style: ["峡谷风光", "自然风光", "高级"],
      isLiked: false,
      isCollected: false
    }
  ]

  // 列表
  const workList = ref([])

  // ==========================================
  // 本地存储方法（绝对稳）
  // ==========================================
  const saveToLocal = () => {
    localStorage.setItem('workList', JSON.stringify(workList.value))
  }

  const loadFromLocal = () => {
    const local = localStorage.getItem('workList')
    if (local) {
      workList.value = JSON.parse(local)
    } else {
      workList.value = defaultWorkList
    }
  }

  // 一加载就读取本地数据
  onMounted(() => {
    loadFromLocal()
  })

  // ==========================================
  // 点赞、收藏
  // ==========================================
  const toggleLike = (id) => {
    const item = workList.value.find(it => it.id === id)
    if (!item) return
    item.isLiked = !item.isLiked
    item.likeCount += item.isLiked ? 1 : -1
    saveToLocal() // 改动就保存
  }

  const toggleCollect = (id) => {
    const item = workList.value.find(it => it.id === id)
    if (!item) return
    item.isCollected = !item.isCollected
    item.collectCount += item.isCollected ? 1 : -1
    saveToLocal() // 改动就保存
  }

  // ==========================================
  // 添加作品（发布用）
  // ==========================================
  const addWork = (newWork) => {
    workList.value.unshift(newWork)
    saveToLocal() // 🔥 发布就保存！
  }

  return {
    workList,
    toggleLike,
    toggleCollect,
    addWork,
    loadFromLocal
  }
})