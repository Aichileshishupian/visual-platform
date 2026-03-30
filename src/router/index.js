import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login/LoginPage.vue'
import FirstPage from '../views/firstPage/FirstPage.vue'


const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/firstpage', component: FirstPage },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router