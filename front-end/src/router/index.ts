import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import { userAuth } from '@/stores/userAuthStore'
import AlugarView from '@/views/AlugarView.vue'
import CreateUserFormView from '@/views/CreateUserFormView.vue'
import ImovelDetail from '@/views/ImovelDetail.vue'
import AnunciarView from '@/views/AnunciarView.vue'
import PageError from '@/views/PageError.vue'
import Perfil from '@/views/Perfil.vue'
import photoPerfil from '@/views/photoTeste.vue'
import MyImovelsView from '@/views/MyImovelsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/teste',
      name: 'teste',
      component: photoPerfil,
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
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: Perfil,
      meta: {
        auth: true
      }
    },
    {
      path: '/myImovels',
      name: 'myImovels',
      component: MyImovelsView,
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
      name: ImovelDetail,
      component: ImovelDetail
    },
    {
      path: '/anuncio/create',
      name: 'anuncioCreate',
      component: AnunciarView,
      meta: {
        auth: true
      }
    },
    {
      path: '/anuncio/edit/:id',
      name: 'anuncioEdit',
      component: AnunciarView,
      meta: {
        auth: true
      }
    },
    { 
      path: "/error", 
      name: "error", 
      component: PageError, 
      props: route => ({ 
        status: route.query.status, 
        msg: route.query.msg 
      }) 
    },
    { 
      path: '/:pathMatch(.*)*', 
      name: 'NotFound', 
      component: PageError 
    }
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
