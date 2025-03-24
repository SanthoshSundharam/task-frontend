import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store/index.js';
Vue.config.productionTip = false;


import './assets/main.css'

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
