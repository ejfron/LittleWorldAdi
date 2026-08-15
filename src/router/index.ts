import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    {
      path: '/memories',
      name: 'memories',
      component: () => import('@/views/MemoriesView.vue'),
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () => import('@/views/GalleryView.vue'),
    },
    {
      path: '/details',
      name: 'details',
      component: () => import('@/views/DetailsView.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
