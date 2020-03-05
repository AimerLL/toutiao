/****
 * 封装请求工具 request.js
 * 对于axios的二次封装
 * 配置拦截器以及其他
 * ****/
import axios from 'axios'
import router from '@/router'
// 拦截器及其他操作
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 配置公共的请求头地址

// 请求拦截器的开发
axios.interceptors.request.use(function (config) {
  // 成功时执行第一个
  // 成功时 第一个参数会有一个config   就是所有的axios请求信息
  // 在第一个函数中 需要将配置进行返回 返回的配置  会作为请求参数进行请求
  // 在返回之前 就是我们注入token的时间
  // 先获取token
  const token = localStorage.getItem('user-token') // 从缓存中获取token
  config.headers.Authorization = `Bearer ${token}` // 统一注入token
  return config
}, function (error) {
  // 失败时执行第二个
  // 失败时 会有一个错误 直接reject错误即可
  // axios 支持promise 失败了应该直接reject
  return Promise.reject(error)
})

// 拦截响应器的开发
axios.interceptors.response.use(function (response) {
  // 成功的时候执行
  // 拦截器中需要将数据返回 将数据进行解构
  return response.data ? response.data : {} // 有的接口没有任何响应数据
}, function (error) {
  // 失败的时候执行
  // error是错误对象 里面包含了错误的状态码 和响应信息
  // 401 状态码  表示用户认证失败 用户身份不对
  // 401出现的时候 表示 拿错钥匙/钥匙过期/钥匙没拿/钥匙名不对/钥匙格式不对 ...
  // 之前的导航守卫  校验了token有没有 检查了钥匙有没有
  // 应该换一个新钥匙 项目1 讲一种比较粗暴的换钥匙 项目2 讲一种比较温柔的钥匙
  // 粗暴的换钥匙 回登录页 => 重新登录换一把新的 重来
  // 回登录页之前 应该把旧钥匙给清除掉
  if (error.response.status === 401) {
    localStorage.removeItem('user0token') // 删除钥匙
    // 直接导入路由实例对象 使用跳转方式 和组件中this.$router是一样的
    router.push('/login') // 跳回登录页
  }
  // 进行错误处理
  return Promise.reject(error)
})
export default axios
