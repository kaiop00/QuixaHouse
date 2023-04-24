import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView/HomeView.vue'
import AnunciarView from '../views/AnunciarView.vue'
import AlugarView from '../views/alugar.vue'
import ReservaView from '../views/alugar.vue'
import LoginView from '../views/login.vue'
import InscricaoView from '../views/inscricao.vue'
import ImovelDetail from '../views/ImovelDetalhes.vue'
import Page403 from '../views/Page403.vue'
import Page404 from '../views/Page404.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/imovels/:id',
      name: 'imovel',
      component: ImovelDetail
    },
    {
      path: '/anunciar',
      name: 'anunciar',
      component: AnunciarView
    },
    {
      path: '/alugar',
      name: 'alugar',
      component: ReservaView
    },
    {
      path: '/reserva',
      name: 'reserva',
      component: AlugarView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/inscricao',
      name: 'inscricao',
      component: InscricaoView
    },
    {
      path: '/forbiden',
      name: 'forbiden',
      component: Page403,
    },
    {
      path: '/notfound',
      name: 'notfound',
      component: Page404,
    },

  ]
})

export default router
