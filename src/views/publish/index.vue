<template>
    <el-card>
        <bread-crumb slot="header">
        <!-- slot="title" 表示评论管理给面包屑的插槽 -->
        <template slot="title">发布文章</template>
        </bread-crumb>
        <!-- 表单组件 -->
        <el-form style="margin-left:50px">
            <el-form-item label="标题" label-width="100px">
                <!-- 输入框 -->
                <el-input placeholder="请输入您的标题" style="width:60%"></el-input>
            </el-form-item>
            <el-form-item label="内容">
                <el-input placeholder="请输入您的内容" type='textarea' :rows="4"></el-input>
            </el-form-item>
            <el-form-item label="封面">
                <!-- 单选框组 -->
                <el-radio-group>
                    <el-radio>单图</el-radio>
                    <el-radio>多图</el-radio>
                    <el-radio>无图</el-radio>
                    <el-radio>自动</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="频道">
                <el-select placeholder="请选择频道">
                    <!-- 下拉选项 -->
                    <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type='primary'>发表</el-button>
                <el-button>存入草稿</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [] // 用来接收频道数据
    }
  },
  methods: {
    // 接收数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels // 将数据赋值给本地数据
      })
    }
  },
  created () {
    // 调用获取接收数据的方法
    this.getChannels()
  }
}
</script>

<style>

</style>
