import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/firstPage/Home.vue'
import WorkList from '../views/WorkList.vue'
import DemandList from '../views/DemandList.vue'
import OrderList from '../views/OrderList.vue'
import UserCenter from '../views/UserCenter.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/login', component: Login },
  { path: '/home', component: Home },
  { path: '/work', component: WorkList },
  { path: '/demand', component: DemandList },
  { path: '/order', component: OrderList },
  { path: '/user', component: UserCenter }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router