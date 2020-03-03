<template>
<!-- 整个页面的大容器 -->
 <el-container>
   <!-- 左侧导航 -->
   <el-aside style="width:230px">
     <layout-aside></layout-aside>
     </el-aside>
   <!-- 右边在放一个大容器 -->
   <el-container>
     <!-- 右侧上顶部栏 -->
     <el-header>
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

</script>

<style>

</style>
