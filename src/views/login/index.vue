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
      <el-form style="margin-top:20px">
        <!-- 表单容器 -->
        <el-form-item>
          <!-- 表单域 -->
          <el-input placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item>
          <el-input style="width:60%" placeholder="请输入验证码"></el-input>
          <!-- 验证码按钮 -->
          <el-button style="float:right; width:38%" plain>发送验证码</el-button>
        </el-form-item>
          <!-- 表单域 -->
        <el-form-item>
          <!-- 是否同意不公平协议 -->
          <el-checkbox>我已阅读同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <!-- 登录按钮表单 -->
        <el-form-item>
          <el-button style="width:100%" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {}
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
    box-shadow: darkgrey 0px 0px 30px 5px;//边框内阴影
    .title {
      text-align: center;
      img {
        height: 40px;
      }
    }
  }
}
</style>
