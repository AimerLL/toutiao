<template>
    <el-card>
        <bread-crumb slot="header">
        <!-- slot="title" 表示评论管理给面包屑的插槽 -->
            <template slot="title">
                素材管理
            </template>
        </bread-crumb>
        <!-- 标签 -->
        <!-- v-model绑定的 就是当前激活显示的页签 -->
        <el-tabs v-model="activeName" @tab-click="changeTab">
            <!-- label标签显示的名称  name页签选中的值 -->
            <el-tab-pane label="全部" name="all">
                <!-- 全部的内容 -->
                <div class="img-list">
                    <el-card class="img-card" v-for="item in list" :key="item.id">
                        <img :src="item.url" alt="">
                        <!-- 操作栏 可以flex布局-->
                        <el-row class='operate' type='flex' align="middle" justify="space-around">
                           <i class='el-icon-star-on'></i>
                           <i class='el-icon-delete-solid'></i>
                        </el-row>
                    </el-card>
                </div>
            </el-tab-pane>
            <el-tab-pane label="收藏" name="collect">
                <!-- 收藏的内容 -->
                <div class="img-list">
                    <el-card class="img-card" v-for="item in list" :key="item.id">
                        <img :src="item.url" alt="">
                    </el-card>
                </div>
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 当前激活的页签  默认显示的all
      list: [] // 用来接收全部素材数据
    }
  },
  methods: {
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect' // false是全部内容  true是收藏的内容
          //  这个位置应该变活 根据当前的页签变活
          //  activeName === 'all' 获取所有的素材  activeName = 'collect' 获取收藏素材
        }
      }).then(result => {
        this.list = result.data.results
      })
    },
    // 切换页签
    changeTab () {
      // 切换的时候根据activeName来决定获取全部还是收藏的数据
      this.getMaterial()
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
    .img-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .img-card {
          width: 220px;
          height: 240px;
          margin: 20px 40px;
          position: relative;
          img {
              width: 100%;
              height: 100%;
          }
          .operate {
              position: absolute;
              left:0;
              bottom:0;
              width: 100%;
              background: #f4f5f6;
              height: 30px;
              i  {
                  font-size:20px;
              }
          }
      }
  }
</style>
