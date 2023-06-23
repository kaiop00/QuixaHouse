import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import { userAuth } from '@/stores/userAuthStore'
import AlugarView from '@/views/AlugarView.vue'
import CreateUserFormView from '@/views/CreateUserFormView.vue'
import ImovelDetail from '@/views/ImovelDetail.vue'
import AnunciarView from '@/views/AnunciarView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        auth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/alugar',
      name: 'alugar',
      component: AlugarView,
      meta: {
        auth: true
      }
    },
    {
      path: '/inscrever',
      name: 'inscrever',
      component: CreateUserFormView
    },
    {
      path: '/imovels/:id',
      name: 'ImovelDetail',
      component: ImovelDetail
    },
    {
      path: '/anunciar',
      name: 'anunciarView',
      component: AnunciarView,
      meta: {
        auth: true
      }
    },
  ]
})
router.beforeEach(async (to, from, next) => {
  const auth = userAuth();
  if(to.meta?.auth && auth) {
    if (auth.token && auth.user){
      const isAuthenticated = await auth.validate();
      if(isAuthenticated) {
        next()
      }
      else{
        next({name: 'login'});
      }
    }else{
      next({name: 'login'});
    }
  }else{
    next();
  }
})

// router.beforeEach((to, from) => {
//   if(to.meta.requiresAdmin && !auth.valida) {
//       return {
//           path: '/login',
//           query: { redirect: to.fullPath }
//       }
//   }
// })

export default router
