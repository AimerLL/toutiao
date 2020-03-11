<template>
  <div class="layout-aside">
      <!-- 头部图片 -->
    <div class="title">
        <img :src="collapse ? smallImg : bigImg" alt="">
    </div>
      <!-- 导航菜单 -->
    <el-menu :collapse="collapse" router background-color="#4a4b50" text-color="#909399">
        <!-- 没有子菜单的用el-menu-item -->
        <el-menu-item  index='/home'>
            <i class="el-icon-s-home"></i>
            <span>首页</span>
        </el-menu-item>
        <!-- 二级菜单用el-submenu -->
        <el-submenu index="2">
            <template  slot="title">
                <i class="el-icon-s-grid"></i>
                <span>内容管理</span>
            </template>
            <!-- 匿名插槽是二级菜单  具名插槽title是一级菜单-->
            <!-- 二级菜单项 还是使用el-menu-item -->
            <el-menu-item index='/home/publish'>发布文章</el-menu-item>
            <el-menu-item index='/home/articles'>内容列表</el-menu-item>
            <el-menu-item index='/home/comment'>评论列表</el-menu-item>
            <el-menu-item index='/home/material'>素材管理</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
            <template  slot="title">
                <i slot="title" class="el-icon-s-opportunity"></i>
                <span slot="title">粉丝管理</span>
            </template>
            <el-menu-item index='/home/picture'>图文数据</el-menu-item>
            <el-menu-item index='/home/fansinfo'>粉丝概况</el-menu-item>
            <el-menu-item index='/home/fansphoto'>粉丝画像</el-menu-item>
            <el-menu-item index='/home/fanslist'>粉丝列表</el-menu-item>
        </el-submenu>
        <el-menu-item  index='/home/account'>
            <i class="el-icon-user-solid"></i>
            <span>账户信息</span>
        </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  // 接收父组件传来的collapse状态值
  props: ['collapse'],
  // 当左侧导航栏状态切换时,导航栏上方的图标也需要变化
  // 此时img是动态的不是固定的 需要把地址改为变量,可以用require
  data () {
    return {
      bigImg: require('../../assets/img/logo_admin.png'),
      smallImg: require('../../assets/img/toutiao.png')
    }
  }
}
</script>

<style lang="less" scoped>
    .layout-aside {
        background-color: #4a4b50;
        height: 100vh;
        // width: 230px;
        .title {
            text-align: center;
            padding-top: 20px;
            img {
               height: 30px;
            }
        }
        .el-menu {
            border-right: none;
            // background-color: #b1b3be;
            // text-color: #afb2b9;
            margin-top: 6px;
        }
    }
</style>
