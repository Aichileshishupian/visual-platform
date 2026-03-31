import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login/LoginPage.vue'
import FirstPage from '../views/firstPage/FirstPage.vue'


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
          component: () => import('@/views/works/WorksCreate.vue')
        },
       {
          path: '/works/WorkList',
          component: () => import('@/views/works/WorkList.vue')
        },
         {
          path: '/works/MyWorks',
          component: () => import('@/views/works/MyWorks.vue')
        },
          {
          path: '/demand/publish',
          component: () => import('@/views/demand/publish.vue')
        },
          {
          path: '/demand/search',
          component: () => import('@/views/demand/search.vue')
        },
          {
          path: '/demand/my',
          component: () => import('@/views/demand/my.vue')
        },
        
        
      ]
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router