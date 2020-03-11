<template>
<!-- 整个页面的大容器 -->
 <el-container>
   <!-- 左侧导航 -->
   <!-- 设置style对象语法 -->
   <!-- 如果collapse为true 表示左侧导航已经切换状态缩进去 则宽改为64px,相反 则宽为正常230px -->
   <el-aside :style="{width: collapse ? '64px' : '230px'}" style="transition:all 0.5s; background:#4a4b50">
     <!-- 左侧导航组件 -->
     <!-- 这里直接用父传子 把collapse组件状态传给子组件 就不用再子组件内在进行操作 -->
     <layout-aside :collapse="collapse"></layout-aside>
     </el-aside>
   <!-- 右边在放一个大容器 -->
   <el-container>
     <!-- 右侧上顶部栏 -->
     <el-header>
       <!-- 顶部操作栏组件 -->
       <layout-header></layout-header>
     </el-header>
     <!-- 右侧下主要区域  el-main 默认给加了20px的内边距-->
     <el-main style="padding:0">
       <!-- 右侧下方主要区域会因为左侧导航的选择而改变  所以应放一个二级容器来承载内容 -->
       <router-view></router-view>
     </el-main>
   </el-container>
 </el-container>
</template>

<script>
import eventBus from '@/utils/eventBus'
export default {
  data () {
    return {
      // 在这里也设置一个collapse 让它和头部组件里的默认值相同 一样为false
      // 然后在切换折叠状态的时候,改变collapse就会和头部组件里的值一致
      collapse: false // 默认展开
    }
  },
  created () {
    // 切换折叠状态
    eventBus.$on('changeCollapse', () => {
      // 进入到这里表示折叠状态一定变化了
      this.collapse = !this.collapse
    })
  }
}
</script>

<style>

</style>
