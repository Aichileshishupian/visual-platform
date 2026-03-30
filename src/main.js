import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia' // 引入 Pinia
import router from './router' // 你的路由
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css' // Element Plus 样式

const app = createApp(App)

app.use(createPinia()) // 挂载 Pinia（必须在 router 之前）
app.use(router)
app.use(ElementPlus)

app.mount('#app')