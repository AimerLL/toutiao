<template>
<!-- element-UI布局的组件 el-row rl-col -->
    <el-row align="middle" type="flex" class="layout-header">
      <!--  左侧 element-UI默认分为24份 -->
        <el-col class="left" :span="12">
          <!-- 图标 -->
          <i @click="collapse=!collapse" :class="{ 'el-icon-s-fold':!collapse, 'el-icon-s-unfold':collapse }"></i>
          <span>江苏传智播客教育科技股份有限公司</span>
        </el-col>
        <!-- 右侧 -->
        <el-col class="right" :span="12">
          <!-- 再次放置一个 row组件  align属性设置垂直对齐方式  justify设置 水平对齐属性-->
            <el-row type="flex" justify="end" align="middle">
                <img :src="userInfo.photo" alt="">
                <!-- 下拉菜单,设置点击事件 触发command-->
                <el-dropdown trigger="click" @command="clickMenu">
                    <span >{{ userInfo.name }}</span>
                    <!-- el-dropdown-menu专门做下拉的组件 -->
                    <el-dropdown-menu slot="dropdown">
                      <!-- el-dropdown-item 专门下拉选项组件  给每一个选项一个command属性 -->
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
import eventBus from '@/utils/eventBus' // 公共区域监听
export default {
  data () {
    return {
      userInfo: {}, // 用它来接受用户信息
      collapse: false // 开始不是折叠的 需要在点击时候切换
    }
  },
  // watch监听data中的变化 data中的数据变化 可以运行watch里的内容
  // collapse在data中 所以可以用watch
  watch: {
    collapse () {
      // 此时说明折叠状态变化了, 然后需要通知左侧导航组件 使其也发生变化
      eventBus.$emit('changeCollapse') // 触发一个改变折叠状态的事件
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
    },
    getUserInfo () {
      // 获取用户的个人信息
      this.$axios({
        url: '/user/profile' // 请求地址
      }).then(result => {
      // 获取成功后,将数据给userInfo
        this.userInfo = result.data
      })
    }
  },
  created () {
    // 获取用户的个人信息
    this.getUserInfo()
    // 监听
    eventBus.$on('updateUser', () => {
      // 有人触发updateUser事件时,就会进到该函数
      // 触发updateUser 就是个人信息变更的时候 这时候要重新获取数据
      this.getUserInfo()
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
