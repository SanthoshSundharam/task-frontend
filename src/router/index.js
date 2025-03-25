// src/router/index.js
import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/views/Home.vue'
import Login from '../components/views/Login.vue'
import Register from '../components/views/Register.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home, meta: { requiresAuth: true } },
    { path: '/login', component: Login },
    { path: '/register', component: Register }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const token = localStorage.getItem('token')
  if (requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
