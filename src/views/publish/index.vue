<template>
    <el-card>
        <bread-crumb slot="header">
        <template slot="title">发布文章</template>
        </bread-crumb>
        <!-- 表单组件 -->
        <el-form ref="myForm" :model="publishForm" :rules="publishRules" style="margin-left:50px" label-width="100px">
            <el-form-item label="标题" prop="title">
                <!-- 输入框 -->
                <el-input v-model="publishForm.title" placeholder="请输入您的标题" style="width:60%"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <el-input v-model="publishForm.content" placeholder="请输入您的内容" type='textarea' :rows="4"></el-input>
            </el-form-item>
            <el-form-item label="封面" prop="cover">
                <!-- 单选框组 -->
                <el-radio-group v-model="publishForm.cover.type">
                    <el-radio :label="1">单图</el-radio>
                    <el-radio :label="3">三图</el-radio>
                    <el-radio :label="0">无图</el-radio>
                    <el-radio :label="-1">自动</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="频道" prop="channel_id">
                <el-select placeholder="请选择频道" v-model="publishForm.channel_id">
                    <!-- 下拉选项 -->
                    <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="publish(false)" type='primary'>发表</el-button>
                <el-button @click="publish(true)">存入草稿</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [], // 用来接收频道数据
      // 发布表单的数据
      publishForm: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // 接口数据0无图 1单图 3三图 -1自动
          images: [] // 字符串数组 对应type type为1 images为1个 为3 为3个 为0 为空
        },
        channel_id: null // 频道id
      },
      // 发布表单的校验规则
      publishRules: {
        title: [{ required: true, message: '文章标题不能为空', trigger: 'blur' },
          { min: 5, max: 30, message: '标题应该在5-30字符之间', trigger: 'blur' }],
        content: [{ required: true, message: '文章内容不能为空', trigger: 'blur' }],
        channel_id: [{ required: true, message: '频道内容不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 发布
    publish (draft) {
      this.$refs.myForm.validate().then(() => {
        // 如果进了then 表示校验成功 调用发布接口  进行发布
        this.$axios({
          url: '/articles',
          method: 'post',
          params: { draft }, // query参数 true是草稿
          data: this.publishForm // body参数
        }).then(() => {
          this.$message.success('发布成功')
          this.$router.push('/home/articles') // 成功后跳转到文章列表页面
        }).catch(() => {
          this.$message.error('发布失败')
        })
      })
    },
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
