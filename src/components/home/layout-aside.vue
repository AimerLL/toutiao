<template>
  <div class="layout-aside">
      <!-- 头部图片 -->
    <div class="title">
        <img src="../../assets/img/logo_admin.png" alt="">
    </div>
      <!-- 导航菜单 -->
    <el-menu background-color="#323745" text-color="#adafb5">
        <!-- 没有子菜单的用el-menu-item -->
        <el-menu-item  index="1">
            <i class="el-icon-s-home"></i>
            <span>首页</span>
        </el-menu-item>
        <!-- 二级菜单用el-submenu -->
        <el-submenu index="2">
            <template  slot="title">
                <i class="el-icon-s-grid"></i>
                <span>内容管理</span>
            </template>
            <el-menu-item index="2-1">发布文章</el-menu-item>
            <el-menu-item index="2-2">内容列表</el-menu-item>
            <el-menu-item index="2-3">评论列表</el-menu-item>
            <el-menu-item index="2-4">素材管理</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
            <template  slot="title">
                <i slot="title" class="el-icon-s-opportunity"></i>
                <span slot="title">粉丝管理</span>
            </template>
            <el-menu-item index="3-1">图文数据</el-menu-item>
            <el-menu-item index="3-2">粉丝概况</el-menu-item>
            <el-menu-item index="3-3">粉丝画像</el-menu-item>
            <el-menu-item index="3-4">粉丝列表</el-menu-item>
        </el-submenu>
        <el-menu-item  index="4">
            <i class="el-icon-user-solid"></i>
            <span>账户信息</span>
        </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
    .layout-aside {
        background-color: #2e2f32;
        height: 100vh;
        width: 230px;
        .title {
            text-align: center;
            padding: 10px 0;
            img {
               height: 30px;
            }
        }
        .el-menu {
            border-right: none;
        }
    }
</style>
