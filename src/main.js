import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import HomeView from './views/HomeView.vue'
import LessonView from './views/LessonView.vue'
import PygameTestView from './views/PygameTestView.vue'
import './style.css'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/test-pygame', component: PygameTestView },
    { path: '/:moduleId/:slug', component: LessonView, props: true },
  ],
})

createApp(App).use(router).mount('#app')
