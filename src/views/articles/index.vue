<template>
    <el-card class="articles">
        <bread-crumb slot="header">
        <!-- slot="title" 表示评论管理给面包屑的插槽 -->
        <template slot="title">内容管理</template>
        </bread-crumb>

        <!-- 搜索-筛选工具栏 -->
        <!-- 表单容器 -->
        <el-form style="padding-left:50px">
          <el-form-item label="文章状态:">
                <!-- 单选框组 -->
                <!-- 筛选第一种方法 监听每个组件的change方法 -->
                <!-- <el-radio-group @change="changeCondition" v-model="searchForm.status"> -->
                <el-radio-group v-model="searchForm.status">
                    <!-- 单选框选项 -->
                    <!-- 接口文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，不传为全部 / 先将 5 定义成 全部 -->
                    <el-radio :label="5">全部</el-radio>
                    <el-radio :label="0">草稿</el-radio>
                    <el-radio :label="1">待审核</el-radio>
                    <el-radio :label="2">审核通过</el-radio>
                    <el-radio :label="3">审核失败</el-radio>
               </el-radio-group>
            </el-form-item>
            <el-form-item label="频道类型:">
                <!-- 选择器 -->
                <!-- 筛选第一种方法 监听每个组件的change方法 -->
                <!-- <el-select @change="changeCondition" placeholder="请选择频道" v-model="searchForm.channel_id"> -->
                <el-select placeholder="请选择频道" v-model="searchForm.channel_id">
                   <!-- 下拉选项通过接口获取 -->
                  <!-- el-option是下拉的选项 label是显示值  value是绑定的值 -->
                   <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="日期范围:">
                <!-- 日期范围选择 -->
                <!-- 筛选第一种方法 监听每个组件的change方法 -->
                <!-- <el-date-picker @change="changeCondition" value-format="yyyy-MM-dd" type='daterange' v-model="searchForm.dateRange"></el-date-picker> -->
                <el-date-picker value-format="yyyy-MM-dd" type='daterange' v-model="searchForm.dateRange"></el-date-picker>
            </el-form-item>
        </el-form>

        <!-- 文章的主体结构 -->
        <el-row class="total" type='flex' align='middle'>
            <span>共找到1000条符合条件的内容</span>
        </el-row>
        <div class="article-item" v-for="item in list" :key="item.id.toString()">
        <!-- 左侧内容 -->
        <div class="left">
            <img :src=" item.cover.images.length ?  item.cover.images[0] : defaultImg" alt="">
            <div class="info">
              <span>{{ item.title }}</span>
              <!-- 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除 -->
              <!-- 只是改变显示的格式 可以用过滤器   两个过滤器 分别处理   显示文本 和 标签类型-->
              <el-tag :type="item.status | filterType" class='tag'>{{  item.status  | filterStatus }}</el-tag>
              <span class='date'>{{ item.pubdate }}</span>
            </div>
        </div>
        <!-- 右侧内容 -->
        <div class="right">
          <!-- 第一种绑定事件跳转方法 -->
          <!-- <span @click="toPublish"><i class="el-icon-edit"></i> 修改</span> -->
          <span @click="$router.push(`/home/publish/${item.id.toString()}`)"><i class="el-icon-edit"></i> 修改</span>
          <span @click="delMaterial(item.id.toString())"><i class="el-icon-delete"></i> 删除</span>
        </div>
      </div>
      <!-- 放置分页组件 -->
      <el-row type='flex' justify="center" style="height:80px" align="middle">
        <!-- 分页组件 -->
        <el-pagination
          background
          layout='prev, pager, next'
          :total="page.total"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          @current-change="changePage">

        </el-pagination>
      </el-row>
    </el-card>
</template>

<script>
import { getChannels } from '@/api/channels'
export default {
  data () {
    return {
      page: {
        total: 0, // 总条数 默认总数是0
        currentPage: 1, // 默认页码,打开页码后显示的页数
        pageSize: 10 // 每页的条数
      },
      //   定义一个表单数据对象
      searchForm: {
        // 数据
        status: 5, // 默认为全部的状态
        channel_id: null, // 表示没有任何的频道
        dateRange: [] // 日期范围
      },
      channels: [], // 接收获取频道的数据
      list: [], // 接受文章列表
      // 地址对应的文件变成了变量 在编译的时候会被拷贝到对应位置
      defaultImg: require('../../assets/img/IU.jpg')
    }
  },
  // 筛选第二种方法  watch监听data中的数据变化
  watch: {
    searchForm: {
      deep: true, // deep 深度检测 不论嵌套多少层 都可以监听到改变
      // handler是一个固定写法 对象中任何的变化都会触发该函数
      handler () {
        // 条件改变 回到第一页
        this.page.currentPage = 1
        this.changeCondition()
      }
    }
  },
  // 过滤器
  filters: {
    filterStatus (value) {
      // 0-草稿，1-待审核，2-审核通过，3-审核失败
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
      }
    },
    // 过滤器除了用在插值表达式 还可以用在v-bind的表达式中
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning' // 草稿 警告
        case 1:
          return 'info' // 待审核
        case 2:
          return '' // 已发表
        case 3:
          return 'danger' // 审核失败
      }
    }

  },
  methods: {
    // 修改文章 跳转到文章发布页面
    toPublish () {
      this.$router.push('/home/publish')
    },
    // 删除
    delMaterial (id) {
      this.$confirm('您确定要删除此条数据?', '提示').then(() => {
        // 进入then 表示用户点击了确定
        this.$axios({
          url: `/articles/${id}`,
          method: 'delete'
        }).then(() => {
          // 如果这时候用getArticles() 则会舍去当前页面的页码和筛选条件 所以用changeCondition()
          this.changeCondition()
        }).catch(() => {
          this.$message.error('删除失败')
        })
      })
    },
    // 点击切换页码的时候执行
    changePage (newPage) {
      this.page.currentPage = newPage // 新页码给数据
      this.changeCondition() // 调用改变事件的方法
    },
    // 改变筛选条件
    // 改变筛选条件时 调用此方法 此时表单数据已经变成最新的
    changeCondition () {
      const params = {
        page: this.page.currentPage,
        per_page: this.page.pageSize,
        status: this.searchForm.status === 5 ? null : this.searchForm.status,
        channel_id: this.searchForm.channel_id,
        begin_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length ? this.searchForm.dateRange[0] : null,
        end_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null
      }
      this.getArticles(params)
    },
    async getChannels () {
      const result = await getChannels()
      // 获取频道接口返回的数据
      this.channels = result.data.channels
    },
    // 获取文章列表
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(result => {
        this.list = result.data.results // 获取文章列表
        // 将总数赋值给total
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    // 获取频道数据
    this.getChannels()
    this.getArticles() // 手动调用获取文章数据
  }
}
</script>

<style lang='less' scoped>
.articles {
      .total {
        height: 60px;
        border-bottom: 1px dashed #ccc;
      }
      // 对文章循环项进行样式的编写
       .article-item {
         display: flex;
         justify-content: space-between;
         padding: 20px  0;
         border-bottom: 1px solid #ccc;
         .left {
           display: flex;
           img {
             width:180px;
             height: 100px;
             border-radius: 4px;
           }
           .info {
             display: flex;
             flex-direction: column;
             height: 100px;
             justify-content: space-around;
             margin-left: 10px;
             .date {
               color: #999;
               font-size:12px;
             }
             .tag {
               width: 60px;
             text-align: center;
             }
           }
         }
         .right {
           span {
             font-size: 12px;
             margin-right: 8px;
             cursor: pointer;
             user-select: none;
           }
         }
       }
   }
</style>
