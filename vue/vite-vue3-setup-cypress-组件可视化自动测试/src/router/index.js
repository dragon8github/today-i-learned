import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', name: 'Home', component: () => import(/* webpackChunkName: "Home" */ '@/views/Home.vue'), },
    { path: '/about', name: 'About', component: () => import(/* webpackChunkName: "About" */ '@/views/About.vue'), },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router
