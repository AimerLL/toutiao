<template>
  <el-card>
    <bread-crumb slot="header">
      <!-- slot="title" 表示评论管理给面包屑的插槽 -->
      <template slot="title">素材管理</template>
    </bread-crumb>
    <!-- 上传组件 -->
    <el-row type="flex" justify="end">
      <!-- 上传组件要求必须传action属性 不传就会报错 可以给一个空字符串-->
      <el-upload :show-file-list="false" :http-request="uploadImg" action="">
        <el-button size="small" type='primary'>上传素材</el-button>
      </el-upload>
    </el-row>
    <!-- 标签 -->
    <!-- v-model绑定的 就是当前激活显示的页签 -->
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <!-- label标签显示的名称  name页签选中的值 -->
      <el-tab-pane label="全部" name="all">
        <!-- 全部的内容 -->
        <!-- 内容 循环生成页面结构 -->
          <div class='img-list'>
            <!-- 采用v-for对list数据进行循环 -->
            <el-card class='img-card' v-for="(item,index) in list" :key="item.id">
              <!-- 放置图片 并且赋值 图片地址-->
              <img :src="item.url" alt="" @click="selectImg(index)">
              <!-- 操作栏 可以flex布局-->
              <el-row class='operate' type='flex' align="middle" justify="space-around">
                <!-- 两个图标注册点击事件  根据 数据判断 图标的颜色-->
                <i @click="collectOrCancel(item)" :style="{color: item.is_collected ? 'red' : 'black'}" class='el-icon-star-on'></i>
                <i @click="delMaterial(item)" class='el-icon-delete-solid'></i>
              </el-row>
            </el-card>
          </div>
      </el-tab-pane>
      <el-tab-pane label="收藏" name="collect">
        <!-- 收藏的内容 -->
        <div class="img-list">
          <el-card class="img-card" v-for="(item,index) in list" :key="item.id">
            <img :src="item.url" alt="" @click="selectImg(index)"/>
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 分页组件 -->
    <!-- 放置一个公共的分页组件 -->
    <el-row type="flex" justify="center" style="height:80px" align="middle">
      <!-- 放置分页组件 total总条数 current-page 当前页码 page-size 每页多少条-->
      <el-pagination
        background
        :total="page.total"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        layout="prev, pager, next"
        @current-change="changePage"
      ></el-pagination>
    </el-row>
    <!-- 素材预览的组件 -->
    <el-dialog @opened="openEnd" :visible="dialogVisible" @close="dialogVisible = false">
      <!-- 放一个走马灯 -->
      <el-carousel ref="myCarousel" indicator-position="outside" height="400px">
        <!-- 放走马灯的幻灯片循环项 -->
        <el-carousel-item v-for="item in list" :key="item.id">
          <img :src="item.url" alt="" style="width:100%;height:100%">
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </el-card>
</template>

<script>
import { getMaterial } from '@/api/material'
export default {
  data () {
    return {
      activeName: 'all', // 当前激活的页签  默认显示的all
      list: [], // 用来接收全部素材数据
      // 存放分页信息
      page: {
        total: 0, // 总条数 默认总数是0
        currentPage: 1, // 默认页码,打开页码后显示的页数
        pageSize: 8 // 每页的条数
      },
      dialogVisible: false, // 控制素材预览显示隐藏
      clickIndex: -1
    }
  },
  methods: {
    openEnd () {
      this.$refs.myCarousel.setActiveItem(this.clickIndex) // 尝试设置index
    },
    // 点击图片时调用,  ---- 走马灯
    selectImg (index) {
      this.clickIndex = index // 索引赋值
      this.dialogVisible = true
    },
    // 取消或者收藏素材的方法
    async collectOrCancel (row) {
      try {
        await this.$axios({
          url: `/user/images/${row.id}`,
          method: 'put',
          data: {
            collect: !row.is_collected
          }
        })
        // 成功了重新获取数据
        this.getMaterial()
      } catch (error) {
        // 失败了消息提示
        this.$message.error('收藏失败')
      }
    },
    // 删除素材的方法
    async delMaterial (row) {
      //  删除之前 应该友好的问候一下 是不是需要删除 ?
      // confirm 也是promise
      await this.$confirm('您确定要删除该图片吗?', '提示')
      try {
        //  如果 确定删除  直接调用删除接口
        await this.$axios({
          method: 'delete', // 请求类型 删除
          url: `/user/images/${row.id}` // 请求地址
        })
        //  成功了应该干啥
        this.getMaterial() // 重新加载数据
      //  如果删除成功了 可以重新拉取数据 也可以 在前端删除  会在 移动端进行场景演示
      // C 端场景  如果删除 或者修改数据 不会重新拉取数据 只会在前端修改对应的一条数据
      // B 端场景 可以拉取数据
      } catch (error) {
        this.$message.error('操作失败')
      }
    },
    // 定义一个自定义上传素材的方法
    async uploadImg (params) {
      try {
        // 接口类型是formData 需要实例化一个Formdata对象
        const data = new FormData()
        // params.file就是需要上传的文件
        data.append('image', params.file)// 加入文件参数
        // 发送上传请求
        await this.$axios({
          url: '/user/images',
          method: 'post',
          data // es6简写  正常data: data
        })
        // 成功之后重新拉取数据
        this.getMaterial()
      } catch (error) {
        this.$message.error('上传素材失败')
      }
    },
    // 点击切换页码的时候执行
    changePage (newPage) {
      this.page.currentPage = newPage // 新页码给数据
      this.getMaterial() // 重新根据新页码获取数据
    },
    // 获取素材数据
    async getMaterial () {
      const result = await getMaterial({
        //  这个位置应该变活 根据当前的页签变活
        //  activeName === 'all' 获取所有的素材  activeName = 'collect' 获取收藏素材
        collect: this.activeName === 'collect', // false是全部内容  true是收藏的内容
        page: this.page.currentPage, // 取页码变量中的值 因为只要页码变量一变 获取的数据跟着变
        per_page: this.page.pageSize // 获取每页数量
      })
      this.list = result.data.results
      // 将总数赋值给total
      // 全部还是收藏的总数 跟随当前页签的变化而变化
      this.page.total = result.data.total_count
    },
    // 切换页签
    changeTab () {
      // 切换的时候要把页码换到第一页
      this.page.currentPage = 1
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
      left: 0;
      bottom: 0;
      width: 100%;
      background: #f4f5f6;
      height: 30px;
      i {
        font-size: 20px;
      }
    }
  }
}
</style>
