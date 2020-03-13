<template>
  <el-card>
        <bread-crumb slot="header">
            <!-- slot="title" 表示评论管理给面包屑的插槽 -->
            <template slot="title">图表</template>
        </bread-crumb>
        <el-row type='flex' justify="space-around">
            <div ref="myChart" class="eharts"></div>
            <div ref="myChart2" class="eharts"></div>
        </el-row>
  </el-card>
</template>

<script>
// 引入图标模板
// 需要知道图标本身是用canvas实现的
import ECharts from 'echarts'
export default {
  mounted () {
    // 图标的实例化 得到一个图标的实例化对象  init方法
    this.myChart = ECharts.init(this.$refs.myChart)
    this.myChart2 = ECharts.init(this.$refs.myChart2)

    // this.myChart就是图表对象  setOption里面的设置文档配置
    // 文档配置可以直接在echarts官网的案例中直接复制拿过来就可以
    this.myChart.setOption({
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
      }]
    })

    this.myChart2.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 10,
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
          ]
        }
      ]
    })
  }
}
</script>

<style>
.eharts {
    width: 600px;
    height: 400px;
  }
</style>
