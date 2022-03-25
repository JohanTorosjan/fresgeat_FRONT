import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueFormulate from '@braid/vue-formulate'
import  '../node_modules/materialize-css/dist/css/materialize.min.css'
import  '../node_modules/materialize-css/dist/js/materialize.min.js'

Vue.use(VueFormulate)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
