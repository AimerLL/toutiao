import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入主页
import Home from '@/views/home'
// 引入登录页
import Login from '@/views/login'
// 引入二级路由组件
import SecondHome from '@/views/home/second_home'
Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/login'// 强制跳转到home页
},
{
  path: '/home',
  name: 'Home',
  component: Home,
  children: [{
    // 如果path写内容,a => /home/a
    path: '', // 二级路由的path什么都不写 代表二级路由的默认组件
    component: SecondHome // 默认的二级路由组件
  }]
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
