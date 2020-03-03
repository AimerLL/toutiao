<template>
  <div class="login">
    <!-- 表单 -->
    <el-card class="login-card">
      <!-- 表单内容 -->
      <!-- 头部logo -->
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <!-- 表单 -->
      <!-- 校验准备一: 定义一个:model 绑定表单数据对象 -->
      <!-- 校验准备二: 定义一个rules 绑定数据的校验规则 -->
      <!-- ref给el-form一个属性 -->
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" style="margin-top:20px">
        <!-- 表单容器 -->
        <!-- 校验准备三: 设置prop属性 表示要校验的字段名 -->
        <el-form-item prop="mobile">
          <!-- 表单域 -->
          <!-- 校验准备四: 需要用v-model将表单中组件双向绑定表单数据 -->
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" style="width:60%" placeholder="请输入验证码"></el-input>
          <!-- 验证码按钮 -->
          <el-button style="float:right; width:38%" plain>发送验证码</el-button>
        </el-form-item>
        <!-- 表单域 -->
        <el-form-item prop="checked">
          <!-- 是否同意不公平协议 -->
          <el-checkbox v-model="loginForm.checked">我已阅读同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <!-- 登录按钮表单 -->
        <el-form-item>
          <el-button @click="login" style="width:100%" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  //  校验准备一: 定义表单数据对象
  //  校验准备二: 定义表单数据的校验规则
  data () {
    return {
      // 登录表单的数据
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        checked: false // 是否同意协议
      },
      // 定义表单数据校验规则
      // required 必填项,如果不填 就无法通过校验/如果为true,就表示该字段必填 不校验布尔值
      // message 当不满足设置的规则时的提示信息
      // pattern 正则表达式
      // validator 自定义校验函数
      loginRules: {
        mobile: [{ required: true, message: '手机号不能为空' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式有误' }], // 手机号验证规则
        code: [{ required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码有误' }], // 验证码验证规则
        checked: [{
          validator: function (rule, value, callback) {
          // rule是当前的校验规则
          // value是当前的要校验的字段的值 true/false
          // calllback是一个回调函数 不论成功或者失败都要执行
          // 成功执行callback 失败执行 callback(new Error('错误信息'))
          // value为true校验成功 false就表示校验失败
          // new Error(错误信息) 就是我们提示的错误信息
            value ? callback() : callback(new Error('您必须同意协议'))
          }
        }] // 是否勾选验证规则
      }
    }
  },
  methods: {
    login () {
      // 第一种方法
      // validate方法全部校验
      // this.$refs.loginForm 获取的就是el-form的对象实例
      // this.$refs.loginForm.validate(function (isOK) {
      //   if (isOK) {
      //     console.log('校验通过')
      //   } else {
      //     console.log('校验未通过')
      //   }
      // })
      // 第二种方法
      this.$refs.loginForm.validate().then(() => {
        // 如果校验成功 会到then里面
        // 校验通过之后,调用登录接口 查看手机号是否正确
        this.$axios({
          url: '/authorizations', // 请求地址
          data: this.loginForm, // body请求体参数 常用于 post /put /patch
          method: 'post' // 请求类型 post/get/delete/put/patch 默认值是get类型 可全大写 可全小写
        }).then(result => {
          // 成功 之后打印结果
          // 把token放入本地缓存
          window.localStorage.setItem('user-token', result.data.data.token)
          // 成功后跳转到主页
          // push 和 router-link类似 to属性 可以直接是字符串 也可以是对象
          this.$router.push('/home')
        }).catch(() => {
          // 失败 提示登录失败消息
          // this.$message({ message: '用户名或者密码错误', type: 'error' })
          this.$message.error('用户名或者密码错误')
        })
      })
    }
  }
}
</script>

<style lang='less' scoped>
// 加了scoped属性 就只会对当前自己的组件起作用
// 如果需要写less 需要在style标签中 lang='less'
.login {
  background-image: url("../../assets/img/login_bg.jpg");
  height: 100vh; // 当前屏幕可视区域分成100份
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 440px;
    height: 340px;
    background-color: rgba(190, 182, 182, 0.6);
    border-color: #d3d3d3;
    box-shadow: darkgrey 0px 0px 30px 5px; //边框内阴影
    .title {
      text-align: center;
      img {
        height: 40px;
      }
    }
  }
}
</style>
