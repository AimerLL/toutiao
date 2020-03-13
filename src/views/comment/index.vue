<template>
  <!-- el-card做主界面 -->
  <el-card v-loading="loading">
    <!-- 放置一个面包屑 -->
    <!-- slot="header" 面包屑的固定组件之一 还有一个是body
     这里表示面包屑会作为具名插槽给card的header部分 -->
    <bread-crumb slot="header">
    <!-- slot="title" 表示评论管理给面包屑的插槽 -->
      <template slot="title">
        评论管理
      </template>
    </bread-crumb>
    <!-- 表格组件 -->
    <el-table :data="list">
      <!-- el-table-column是列 -->
      <!-- prop表示显示的字段  label表示表头 -->
      <el-table-column prop="title" label="标题" width="600"></el-table-column>
      <!-- 给标签添加formatter  用来格式化内容  因为el-table不显示布尔值 -->
      <el-table-column :formatter="formatterBool" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <!-- el-table-column组件 在插槽中传出了 row $index store column -->
        <!-- 插槽 -> 作用域插槽 ->子组件中的数据 通过插槽传出 slot-scope接收  row(行数据) $index(索引)  -->
        <template slot-scope="obj">
          <el-button size="small" type='text'>修改</el-button>
          <el-button @click="openOrClose(obj.row)" size="small" type='text'>{{ obj.row.comment_status ? '关闭' : '打开' }}评论</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 放置分页组件 -->
    <el-row style="height:80px" type='flex' align='middle' justify="center">
      <el-pagination background layout="prev, pager, next"
      :total="page.total"
      :current-page="page.currentPage"
      :page-size="page.pageSize"
      @current-change="changePage">

      </el-pagination>
    </el-row>

  </el-card>
</template>

<script>
export default {
  data () {
    return {
      page: {
        total: 0, // 总条数 默认总数是0
        currentPage: 1, // 默认页码,打开页码后显示的页数
        pageSize: 10 // 每页的条数 默认值是10
      },
      list: [],
      loading: false // 控制遮罩层显示或隐藏
    }
  },
  methods: {
    // 页码改变事件  newPage是点击切换的最新页码
    changePage (newPage) {
      // 点击切换新的页码后,把最新的页码给page下的当前页码
      this.page.currentPage = newPage // 赋值最新页码
      this.getComment() // 重新拉取数据 获取评论
    },
    // 定义获取评论的方法  获取评论数据
    async getComment () {
      // 请求数据之前 打开遮罩层
      this.loading = true
      const result = await this.$axios({
        url: '/articles', // 请求地址
        params: {
          // 请求地址控制了多个类型,comment用来控制获取评论的数据类型
          response_type: 'comment',
          page: this.page.currentPage, // 查点击对应页数据
          per_page: this.page.pageSize // 查对应页的10条数据
        }
      })
      this.list = result.data.results
      // console.log(result)
      // 获取完数据后将总数赋值给total
      this.page.total = result.data.total_count
      // 数据请求之后 关闭遮罩层
      this.loading = false
    },
    // 定义一个格式化函数
    formatterBool (row, column, cellValue, index) {
      // row 代表当前的一行数据
      // column 代表当前的列信息
      // cellValue 代表当前单元格的值
      // index 代表当前的索引
      // 该函数需要返回一个值 用来显示
      return cellValue ? '正常' : '关闭'
    },
    async openOrClose (row) {
      // 打开或者关闭
      const mess = row.comment_status ? '关闭' : '打开'
      // 点击确定进入then 取消进入catch
      await this.$confirm(`是否确定${mess}评论`, '提示')
      try {
        // 调用接口 进行打开或者关闭
        await this.$axios({
          url: '/comments/status', // 请求地址
          method: 'put',
          // query参数
          params: {
            // 正常传会失败 因为id超过最大安全数字
            // 用大数字保证id不被转化
            article_id: row.id.toString() // 要求参数的文章id
          },
          // data里写body参数
          data: {
            //
            allow_comment: !row.comment_status // 打开还是关闭状态和评论的状态相反
          }
        })
        //   成功 先提示消息
        this.$message.success(`${mess}评论成功`)
        //  然后重新拉取数据
        this.getComment() // 调用重新拉取数据的方法
      } catch (error) {
        // 失败 提示失败
        this.$message.error(`${mess}评论失败`)
      }
    }
  },
  created () {
    // 在钩子函数中 直接获取数据
    this.getComment()
  }
}
</script>

<style>

</style>
