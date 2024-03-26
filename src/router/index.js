import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Chatwin from '@/components/Chatwin'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home}
  // { path: '/', redirect: '/home' },
  // { path: '/home', component: Chatwin}
]

const router = new VueRouter({
  routes
})

export default router
