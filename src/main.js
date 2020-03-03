import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入UI模块
import axios from 'axios' // 引入axios
import Components from '@/components'
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import '@/styles/index.less' // 引入样式=>初始化工作
Vue.config.productionTip = false
Vue.use(ElementUI)// 全局注册element模块，所有的位置都可以使用组件 这样就能为所欲为了
Vue.use(Components)//
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 配置公共的请求头地址
Vue.prototype.$axios = axios // 将axios赋值给 Vue对象的原型属性
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
// 在这里完成了 Vue的实例化 并且已经挂载了路由
