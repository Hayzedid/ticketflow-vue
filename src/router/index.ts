import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('@/views/LandingView.vue')
    },
    {
      path: '/auth',
      component: () => import('@/views/auth/AuthLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/auth/LoginView.vue')
        },
        {
          path: 'signup',
          name: 'signup',
          component: () => import('@/views/auth/SignupView.vue')
        }
      ]
    },
    {
      path: '/app',
      component: () => import('@/views/AppLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue')
        },
        {
          path: 'tickets',
          name: 'tickets',
          component: () => import('@/views/tickets/TicketListView.vue')
        },
        {
          path: 'tickets/create',
          name: 'ticket-create',
          component: () => import('@/views/tickets/TicketCreateView.vue')
        },
        {
          path: 'tickets/:id/edit',
          name: 'ticket-edit',
          component: () => import('@/views/tickets/TicketEditView.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue')
    }
  ]
})

// Navigation guard for authentication
router.beforeEach((to) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})

export default router
