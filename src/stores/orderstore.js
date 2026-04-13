import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getOrderListService,
  createOrderService,
  updateOrderStatusService,
  getMyOrdersService,
} from '@/api/orderApi.js'

export const useOrderStore = defineStore('order', () => {
  const orderList = ref([])
  const myOrders = ref([])

  const fetchOrderList = async (params = {}) => {
    try {
      const res = await getOrderListService(params)
      const list = res && res.data ? res.data : res || []
      orderList.value = list
      return res
    } catch (err) {
      console.error('fetchOrderList error', err)
      throw err
    }
  }

  const createOrder = async (data) => {
    try {
      const res = await createOrderService(data)
      const created = res && res.data ? res.data : res || null
      if (created) {
        const newItem = Array.isArray(created) ? created[0] : created
        if (newItem) orderList.value = [newItem, ...(orderList.value || [])]
      }
      return res
    } catch (err) {
      console.error('createOrder error', err)
      throw err
    }
  }

  const updateOrderStatus = async (id, status) => {
    try {
      const res = await updateOrderStatusService(id, status)
      // 本地同步状态
      const idx = orderList.value.findIndex((o) => o.id === id || o._id === id)
      if (idx !== -1) {
        orderList.value[idx].status = status
      }
      const myIdx = myOrders.value.findIndex((o) => o.id === id || o._id === id)
      if (myIdx !== -1) myOrders.value[myIdx].status = status
      return res
    } catch (err) {
      console.error('updateOrderStatus error', err)
      throw err
    }
  }

  const fetchMyOrders = async () => {
    try {
      const res = await getMyOrdersService()
      myOrders.value = res && res.data ? res.data : res || []
      return myOrders.value
    } catch (err) {
      console.error('fetchMyOrders error', err)
      throw err
    }
  }

  return {
    orderList,
    myOrders,
    fetchOrderList,
    createOrder,
    updateOrderStatus,
    fetchMyOrders,
  }
})
