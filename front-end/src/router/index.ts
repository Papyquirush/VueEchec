import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/play',
      name: 'play',
      component: () => import('@/views/PlayView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LogInView.vue'),
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('@/views/LogOutView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue')
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: () => import('@/views/LeaderboardView.vue')
    },
    {
      path: '/public-games',
      name: 'public-games',
      component: () => import('@/views/PublicGamesView.vue')
    },
    {
      path: '/rewatch',
      name: 'rewatch',
      component: () => import('@/views/RewatchView.vue')
    }
  ],
})

export default router
