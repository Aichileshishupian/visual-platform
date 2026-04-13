import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'

export const useDemandStore = defineStore('demand', () => {
  const demandList = ref([])
  const myDemands = ref([])

  // 读取本地
  const loadFromLocal = () => {
    const d = localStorage.getItem('demandList')
    const m = localStorage.getItem('myDemands')
    if (d) demandList.value = JSON.parse(d)
    if (m) myDemands.value = JSON.parse(m)
  }

  // 保存本地
  const saveToLocal = () => {
    localStorage.setItem('demandList', JSON.stringify(demandList.value))
    localStorage.setItem('myDemands', JSON.stringify(myDemands.value))
  }

  // 获取我的需求
  const fetchMyDemands = () => {
    loadFromLocal()
    return myDemands.value
  }

  // 获取全部
  const fetchDemandList = () => {
    loadFromLocal()
    return demandList.value
  }

  // 发布
  const addDemand = (data) => {
    const item = {
      id: Date.now(),
      ...data,
      createTime: new Date().toLocaleString() // 自动生成发布时间
    }
    demandList.value.unshift(item)
    myDemands.value.unshift(item)
    saveToLocal()
  }

  // 删除
  const deleteDemand = (id) => {
    demandList.value = demandList.value.filter(i => i.id !== id)
    myDemands.value = myDemands.value.filter(i => i.id !== id)
    saveToLocal()
  }

  // 修改
  const updateDemand = (updated) => {
    const fn = (item) => item.id === updated.id ? { ...item, ...updated } : item
    demandList.value = demandList.value.map(fn)
    myDemands.value = myDemands.value.map(fn)
    saveToLocal()
  }

  onMounted(loadFromLocal)

  return {
    demandList,
    myDemands,
    fetchDemandList,
    fetchMyDemands,
    addDemand,
    deleteDemand,
    updateDemand
  }
})