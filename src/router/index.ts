import { capitalize } from '@/lib/utils'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      redirect: '/blog',
      component: () => import('../views/dashboard/DashboardLayout.vue'),
      children: [
        {
          path: '/blog',
          name: 'blog',
          component: () => import('../views/dashboard/blog/BlogView.vue'),
        },
        {
          path: '/blog/create',
          name: 'Create Blog',
          component: () => import('../views/dashboard/blog/BlogCreateView.vue'),
        },
        {
          path: '/blog/detail/:id',
          name: 'Detail Blog',
          component: () => import('../views/dashboard/blog/BlogDetailView.vue'),
        },
        {
          path: '/blog/edit/:id',
          name: 'Edit Blog',
          component: () => import('../views/dashboard/blog/BlogEditView.vue'),
        },
      ],
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/auth/AuthLayout.vue'),
      redirect: '/auth/login',
      children: [
        {
          path: '/auth/login',
          name: 'login',
          component: () => import('../views/auth/LoginView.vue'),
        },
        {
          path: '/auth/register',
          name: 'register',
          component: () => import('../views/auth/RegisterView.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to, _, next) => {
  document.title = `HashMicro - ${capitalize(to.name as string)}`
  next()
})

export default router
