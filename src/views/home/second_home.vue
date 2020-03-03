<template>
  <!-- 二级路由的默认组件 -->
  <div class="second-home">
      <!-- 幻灯片 -->
    <el-carousel :interval="4000" type="card" height="500px">
      <el-carousel-item v-for="item in list" :key="item">
         <img :src="item" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583250088479&di=3f789bc78e8253c0cf206a17c989d4c4&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201706%2F10%2F20170610002722_aiLvc.jpeg',
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1131779038,2028376511&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=129874930,742584751&fm=26&gp=0.jpg',
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3669675253,941952264&fm=26&gp=0.jpg'
      ]
    }
  }
}
</script>

<style>
  .second-home {
      /* calc 计算的意思 在css中计算数值 用法  calc ( 四则运算  ) 变量之间 和运算符之间一定要有空格 */
      height: calc(100vh - 60px);
      background: url('http://pic1.win4000.com/wallpaper/0/59c9c1cbdf960.jpg');
      background-size: cover;
  }
</style>
