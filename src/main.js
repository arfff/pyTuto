import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import HomeView from './views/HomeView.vue'
import LessonView from './views/LessonView.vue'
import AboutView from './views/AboutView.vue'
import './style.css'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/coulisses', component: AboutView },
    { path: '/:moduleId/:slug', component: LessonView, props: true },
  ],
})

createApp(App).use(router).mount('#app')
