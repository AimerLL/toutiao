<template>
  <el-card>
        <bread-crumb slot="header">
            <!-- slot="title" 表示评论管理给面包屑的插槽 -->
            <template slot="title">账户信息</template>
        </bread-crumb>
        <!-- 表单容器 -->
        <el-form ref="myForm" :model="formData" :rules="rules" label-width="100px">
            <el-form-item prop="name" label="用户名">
                <el-input v-model="formData.name" style="width:30%"></el-input>
            </el-form-item>
            <el-form-item label="简 介">
                <el-input v-model="formData.intro" style="width:30%"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="邮 箱">
                <el-input v-model="formData.email" style="width:30%"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <!-- 手机只能看 不能改 因为手机号是登录的标识 -->
                <el-input v-model="formData.mobile" disabled style="width:30%"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' @click="saveUser">保存</el-button>
            </el-form-item>
        </el-form>
        <!-- 头像 -->
        <!-- show-file-list不显示上传数据列表 -->
        <el-upload action="" :http-request="uploadImg" show-file-list="false">
        <img class="head-upload" :src="formData.photo ? formData.photo : defaultImg" alt="">
        </el-upload>
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
      },
      rules: {
        name: [{ required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 1, max: 7, message: '用户名的长度为1-7位', trigger: 'blur' }],
        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' },
          { pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, message: '邮箱格式不正确', trigger: 'blur' }
        ]
      },
      defaultImg: require('../../assets/img/4.jpg') // 默认头像的变量
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
    },
    // 保存用户信息
    saveUser () {
      // 保存前校验
      this.$refs.myForm.validate().then(() => {
        // 进到then 校验成功 可以保存 调用接口
        this.$axios({
          url: '/user/profile',
          method: 'patch',
          data: this.formData
        }).then(() => {
          this.$message.success('保存用户信息成功')
        }).catch(() => {
          this.$message.error('保存用户信息失败')
        })
      })
    },
    // 上传图片
    uploadImg (params) {
      // params.file 就是需要的文件
      const data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then(result => {
        this.formData.photo = result.data.photo
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
