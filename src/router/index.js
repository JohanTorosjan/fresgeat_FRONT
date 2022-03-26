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
    component: () => import( '../views/CookerSignup.vue'),
  },
  {

  path: '/customerHome',
  name: 'customerHome',
  component : () => import('../views/customerHome.vue'),
  meta:{requireAuth:true}
  },

  {
    path: '/cookerHome',
    name: 'cookerHome',
    component : () => import('../views/cookerHome.vue'),
    meta:{requireAuth:true}
  },
  {
    path: '/AvailablesCook',
    name: 'AvailablesCook',
    component : () => import('../views/AvailablesCook.vue'),
    meta:{requireAuth:true}
  },
  {
    path: '/MyOrders',
    name: 'MyOrders',
    component : () => import('../views/MyOrders.vue'),
    meta:{requireAuth:true}
  },
  {
    path: '/askCooker',
    name: 'askCooker',
    component : () => import('../views/askCooker.vue'),
    meta:{requireAuth:true}
  },
  {
  path: '/addReceipes',
  name: 'addReceipes',
  component : () => import('../views/addReceipes.vue'),
  meta:{requireAuth:true}
  },
  
  {
    path: '/commandTab',
    name: 'commandTab',
    component : () => import('../views/commandTab.vue'),
    meta:{requireAuth:true}
    },
    
  



]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) => {
  if(to.meta.requireAuth){
    if(!sessionStorage.getItem("Token")){
      next("/");
    }
    else{
      next();
    }
  }
  else{
    next();
  }
});

export default router
