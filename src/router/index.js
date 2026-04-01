import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login/LoginPage.vue'
import FirstPage from '../views/firstPage/FirstPage.vue'
import { useUserStore } from '@/stores/userstore.js'
import { ElMessage } from 'element-plus'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/firstpage', component: FirstPage },
  {
      path: '/',
      component: () => import('@/views/firstpage/FirstPage.vue'),
      redirect: '/firstpage/FirstPage',
      children: [
        {
          path: '/works/WorksCreate',
          component: () => import('@/views/works/WorksCreate.vue'),
          meta: { requiresAuth: true }
        },
       {
          path: '/works/WorkList',
          component: () => import('@/views/works/WorkList.vue'),
         
        },
         {
          path: '/works/MyWorks',
          component: () => import('@/views/works/MyWorks.vue'),
          meta: { requiresAuth: true }
        },
          {
          path: '/demand/publish',
          component: () => import('@/views/demand/publish.vue'),
          meta: { requiresAuth: true }
        },
          {
          path: '/demand/search',
          component: () => import('@/views/demand/search.vue'),
          meta: { requiresAuth: true }
        },
          {
          path: '/demand/my',
          component: () => import('@/views/demand/my.vue'),
          meta: { requiresAuth: true }
        },
        
        
      ]
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  
  // 如果要去的页面需要登录
  if (to.meta.requiresAuth) {
    // 判断是否登录（有token = 登录）
    if (userStore.token) {
      next() // 已登录 → 放行
    } else {
      ElMessage.error('还未登录，请先登录')
     next('/login') // 未登录 → 跳登录
     
    }
  } else {
    next() // 不需要登录的页面，直接放行
  }
})
export default router