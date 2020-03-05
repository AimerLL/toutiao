<template>
  <!-- 二级路由的默认组件 -->
  <div class="second-home">
      <!-- 幻灯片 -->
    <!-- <el-carousel :interval="4000" type="card" height="500px">
      <el-carousel-item v-for="item in list" :key="item">
         <img :src="item" alt="">
      </el-carousel-item>
    </el-carousel> -->
<div class="wrap">
  <div class="cube">
    <div class="out_front">
      <img class="pic" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1131779038,2028376511&fm=26&gp=0.jpg" alt="">
    </div>
    <div class="out_back">
      <img class="pic" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1131779038,2028376511&fm=26&gp=0.jpg" alt="">
    </div>
    <div class="out_left">
      <img class="pic" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1131779038,2028376511&fm=26&gp=0.jpg" alt="">
    </div>
    <div class="out_right">
      <img class="pic" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1131779038,2028376511&fm=26&gp=0.jpg" alt="">
    </div>
    <div class="out_top">
      <img class="pic" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1131779038,2028376511&fm=26&gp=0.jpg" alt="">
    </div>
    <div class="out_bottom">
      <img class="pic" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1131779038,2028376511&fm=26&gp=0.jpg" alt="">
    </div>
  </div>
</div>
</div>
</template>

<script>
export default {
  // data () {
  //   return {
  //     list: [
  //       'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583250088479&di=3f789bc78e8253c0cf206a17c989d4c4&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201706%2F10%2F20170610002722_aiLvc.jpeg',
  //       'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1131779038,2028376511&fm=26&gp=0.jpg',
  //       'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=129874930,742584751&fm=26&gp=0.jpg',
  //       'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3669675253,941952264&fm=26&gp=0.jpg'
  //     ]
  //   }
  // }
}
</script>

<style>
  .second-home {
      /* calc 计算的意思 在css中计算数值 用法  calc ( 四则运算  ) 变量之间 和运算符之间一定要有空格 */
      /* height: calc(100vh - 60px); */
      height: 564px;
      background: url("../../assets/img/2.jpg");
      background-size: cover;
  }
  .wrap{
    width: 200px;
    height: 200px;
    padding: 150px 200px;
    position: relative;
  }
  .cube{
    width: 200px;
    height: 200px;
    margin: 0 auto;
    transform-style: preserve-3d;
    transform: rotateX(-30deg) rotateY(-80deg);
    -webkit-animation: rotate 30s infinite;
    animation-timing-function: linear;
  }
  @-webkit-keyframes rotate {
    from{transform: rotateX(0deg) rotateY(0deg);}
    to{transform: rotateX(360deg) rotateY(360deg);}
  }
  .out_front,
  .out_back,
  .out_left,
  .out_right,
  .out_top,
  .out_bottom {
    position: absolute;
    width: 200px;
    height: 200px;
    opacity: 0.8;
    transition: all .4s;
  }
  .pic{
    width: 200px;
    height: 200px;
  }
  .out_front{
    transform: rotateX(0deg) translateZ(100px);
  }
  .out_back{
    transform: translateZ(-100px) rotateY(180deg);
  }
  .out_left{
    transform: rotateY(90deg) translateZ(100px);
  }
  .out_right{
    transform: rotateY(-90deg) translateZ(100px);
  }
  .out_top{
    transform: rotateX(90deg) translateZ(100px);
  }
  .out_bottom{
    transform: rotateX(-90deg) translateZ(100px);
  }

  .cube:hover .out_front{
    transform: rotateY(0deg) translateZ(200px);
  }
  .cube:hover .out_back{
    transform: translateZ(-200px) rotateY(180deg);
  }
  .cube:hover .out_left{
    transform: rotateY(90deg) translateZ(200px);
  }
  .cube:hover .out_right{
    transform: rotateY(-90deg) translateZ(200px);
  }
  .cube:hover .out_top{
    transform: rotateX(90deg) translateZ(200px);
  }
  .cube:hover .out_bottom{
    transform: rotateX(-90deg) translateZ(200px);
  }

</style>
