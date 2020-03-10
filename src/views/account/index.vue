<template>
  <el-card>
        <bread-crumb slot="header">
            <!-- slot="title" 表示评论管理给面包屑的插槽 -->
            <template slot="title">账户信息</template>
        </bread-crumb>
        <!-- 表单容器 -->
        <el-form label-width="100px">
            <el-form-item label="用户名">
                <el-input v-model="formData.name" style="width:30%"></el-input>
            </el-form-item>
            <el-form-item label="简 介">
                <el-input v-model="formData.intro" style="width:30%"></el-input>
            </el-form-item>
            <el-form-item label="邮 箱">
                <el-input v-model="formData.email" style="width:30%"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <!-- 手机只能看 不能改 因为手机号是登录的标识 -->
                <el-input v-model="formData.mobile" disabled style="width:30%"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type='primary'>保存</el-button>
            </el-form-item>
        </el-form>
        <!-- 头像 -->
        <img class="head-upload" src="../../assets/img/4.jpg" alt="">
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      }
    }
  },
  methods: {
    // 获取用户个人资料
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data // 数据赋值给表单
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style>
    .head-upload {
        position: absolute;
        right: 400px;
        top: 150px;
        width: 200px;
        height: 200px;
        border-radius: 50%;
    }
</style>
