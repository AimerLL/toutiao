// 此文件专门处理路由权限的问题

import router from '@/router'
import progress from 'nprogress' // 进度条包
import 'nprogress/nprogress.css' // 样式文件

// 注册全局守卫
router.beforeEach(function (to, from, next) {
  // 开启进度条
  progress.start()
  // next()一般有三种场景
  // next()完全放过 next(false)不能跳 next(新地址)去新的地址
  // 首先判断 要拦截哪些页面 如果去/home 就进行token的判断
  // 判断要去的页面是不是 /home 开头
  if (to.path.startsWith('/home')) {
    // 是/home开头 表示要去主页     判断token
    const token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    // 如果不是去主页相关 放过
    next()
  }
})
// 全局的后置守卫的位置关闭 此时已经完成路由跳转
router.afterEach(() => {
  // 处理进度条关闭的问题
  // setTimeout(() => progress.done(), 300) 进度条延迟
  progress.done()
})
