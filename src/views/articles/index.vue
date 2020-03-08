<template>
    <el-card>
      <bread-crumb slot="header">
      <!-- slot="title" 表示评论管理给面包屑的插槽 -->
      <template slot="title">内容管理</template>
    </bread-crumb>
    <!-- 搜索-筛选工具栏 -->
    <!-- 表单容器 -->
    <el-form style="padding-left:50px">
        <el-form-item label="文章状态:">
            <!-- 单选框组 -->
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
            <el-select  placeholder="请选择频道" v-model="searchForm.channel_id">
                <!-- 下拉选项通过接口获取 -->
                <!-- el-option是下拉的选项 label是显示值  value是绑定的值 -->
                <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="日期范围:">
            <!-- 日期范围选择 -->
            <el-date-picker type='daterange' v-model="searchForm.dateRange"></el-date-picker>
        </el-form-item>
    </el-form>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
    //   定义一个表单数据对象
      searchForm: {
        // 数据
        status: 5, // 默认为全部的状态
        channel_id: null, // 表示没有任何的频道
        dateRange: [] // 日期范围
      },
      channels: [] // 接收获取频道的数据
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        // 获取频道接口返回的数据
        this.channels = result.data.channels
      })
    }
  },
  created () {
    // 获取频道数据
    this.getChannels()
  }
}
</script>

<style>

</style>
