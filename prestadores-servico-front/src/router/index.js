import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: ()=> import('../views/CadastroPrestador.vue')
  },
  {
    path: '/consulta',
    name: 'consulta',
    component: ()=> import('../views/ConsultaPrestador.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
