import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateOfertasView from '../views/CreateOfertasView.vue'
import ListarOfertasView from '../views/ListarOfertasView.vue'
import CronogramaOfertasView from '../views/CronogramaOfertasView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/create',
    name: 'create',
    component: CreateOfertasView
  },
  {
    path: '/list',
    name: 'list',
    component: ListarOfertasView
  },
  {
    path: '/eventos/cronograma/:id',
    name: 'eventos/cronograma',
    component: CronogramaOfertasView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
