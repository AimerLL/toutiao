<template>
  <!-- el-card做主界面 -->
  <el-card>
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
        <el-button size="small" type='text'>修改</el-button>
        <el-button size="small" type='text'>关闭评论</el-button>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [

      ]
    }
  },
  methods: {
    // 定义获取评论的方法
    getComment () {
      this.$axios({
        url: '/articles', // 请求地址
        params: {
          // 请求地址控制了多个类型,comment用来控制获取评论的数据类型
          response_type: 'comment'
        }
      }).then(result => {
        this.list = result.data.results
        // console.log(result)
      })
    },
    // 定义一个格式化函数
    formatterBool (row, column, cellValue, index) {
      // row 代表当前的一行数据
      // column 代表当前的列信息
      // cellValue 代表当前单元格的值
      // index 代表当前的索引
      // 该函数需要返回一个值 用来显示
      return cellValue ? '正常' : '关闭'
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
