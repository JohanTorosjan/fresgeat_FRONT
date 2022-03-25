import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MyChoice',
    component: () => import( '../views/MyChoice.vue')
  },
  {
    path: '/CustomerLogin',
    name: 'Customer',
    component: () => import( '../views/CustomerLogin.vue')
  },
  {
    path: '/CookerLogin',
    name: 'CookerLogin',
    component: () => import( '../views/CookerLogin.vue')
  },

  {
    path: '/CustomerSignup',
    name: 'CustomerSignup',
    component: () => import( '../views/CustomerSignup.vue')
  },

  {
    path: '/CookerSignup',
    name: 'CookerSignup',
    component: () => import( '../views/CookerSignup.vue')
  },
  {

  path: '/customerHome',
  name: 'customerHome',
  component : () => import('../views/customerHome.vue')
  },

  {
    path: '/cookerHome',
    name: 'cookerHome',
    component : () => import('../views/cookerHome.vue')
  },
  {
    path: '/AvailablesCook',
    name: 'AvailablesCook',
    component : () => import('../views/AvailablesCook.vue')
  },
  {
    path: '/MyOrders',
    name: 'MyOrders',
    component : () => import('../views/MyOrders.vue')
  },
  {
    path: '/askCooker',
    name: 'askCooker',
    component : () => import('../views/askCooker.vue')
  },
  {
  path: '/addReceipes',
  name: 'addReceipes',
  component : () => import('../views/addReceipes.vue')
  },
  
  {
    path: '/commandTab',
    name: 'commandTab',
    component : () => import('../views/commandTab.vue')
    },
    
  



]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
