import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入主页
import Home from '@/views/home'
// 引入登录页
import Login from '@/views/login'
Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/login'// 强制跳转到home页
},
{
  path: '/home',
  name: 'Home',
  component: Home
},
{
  path: '/login',
  name: 'login',
  component: Login
}
  // {
  // path: '/about',
  // name: 'About',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
