<template>
<!-- element-UI布局的组件 el-row rl-col -->
    <el-row align="middle" type="flex" class="layout-header">
        <el-col class="left" :span="12">
            <i class="el-icon-s-fold"></i>
            <span>江苏传智播客教育科技股份有限公司</span>
        </el-col>
        <el-col class="right" :span="12">
            <el-row type="flex" justify="end" align="middle">
                <img :src="userInfo.photo" alt="">
                <el-dropdown trigger="click" @command="clickMenu">
                    <span >{{ userInfo.name }}</span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="info">个人信息</el-dropdown-item>
                        <el-dropdown-item command="git">git地址</el-dropdown-item>
                        <el-dropdown-item command="lgout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {} // 用它来接受用户信息
    }
  },
  methods: {
    clickMenu (command) {
      if (command === 'info') {
        // 进入个人信息
        alert(1)
      } else if (command === 'git') {
        // 跳转到git地址
        window.location.href = 'https://github.com/AimerLL/toutiao.git'
      } else {
        // 退出 1.删除token 2.跳转回登录页
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      }
    }
  },
  created () {
    // 从缓存中获取token
    const token = localStorage.getItem('user-token')
    // 获取用户的个人信息
    this.$axios({
      url: '/user/profile', // 请求地址
      headers: {
        Authorization: `Bearer ${token}` // 固定格式
      } // 放置请求头参数
    }).then(result => {
      // 获取成功后,将数据给userInfo
      this.userInfo = result.data.data
    })
  }
}
</script>

<style lang="less" scoped>
    .layout-header {
        height: 60px;
        .left {
            i {
                font-size: 20px;
                margin-right: 20px;
            }
        }
        .right {
            img {
                width: 35px;
                height: 35px;
                border-radius: 50%;
                margin: 10px;
            }
        }
    }
</style>
