<template>
  <div class="cover-image">
      <div @click="openDialog(index)" class="cover-image-item" v-for="(item,index) in list" :key="index">
          <!-- 图片的地址应该等于 item -->
          <!-- 一开始item是一个空字符串 因为此时还没有选择图片 此时应该根据 item是否有值 来决定显示默认图片还是item -->
          <!-- item如果没有值就显示 默认图片 -->
          <!-- img 如果不是固定地址的话 图片应该先转化成变量 -->
          <img :src="item ? item : defaultImg" alt="">
      </div>
      <el-dialog :visible="dialogVisible" @close="dialogVisible=false">
          <!-- 选择图片的组件 -->
          <!-- 监听谁得自定义事件就在谁的标签上写v-on/@ -->
          <select-image @selectOneImg="receiveImg"></select-image>
      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'], // 父传子接收参数
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'), // 默认图片
      dialogVisible: false, // 弹层默认隐藏 切换
      selectIndex: -1 // 用来记录当前点击了哪个索引
    }
  },
  methods: {
    openDialog (index) {
      // 点击图片时 弹层
      this.dialogVisible = true
      this.selectIndex = index // 记录点击哪张图片
    },
    // 接收传递数据的地址
    receiveImg (url) {
      // 接收到了url 图片的地址 需要把地址给img的src
      // 但是src里的数据item 来自props数据 不能直接进行修改 只能进行读取
      // 所以再往上传 再次传递给父组件 让父组件进行修改
      this.$emit('selectTwoImg', url, this.selectIndex)// 再次把数据传给父组件
      // 二次传递的时候,需要把上面记录的索引 传出去
      // 二次传值之后关闭弹层(在页面鼠标点击选择完素材后 把弹层关闭)
      this.dialogVisible = false
    }
  }
}
</script>

<style lang='less' scoped>
.cover-image {
    display: flex;
    margin: 20px 100px;
    .cover-image-item {
        border: 1px solid #ccc;
        width: 250px;
        height: 250px;
        img {
            width: 100%;
        }
    }
}
</style>
