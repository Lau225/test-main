<template>
  <div class="mixed-chart-container">
    <div class="panel-header">
      <span class="panel-arrows">>>></span>
      <span class="panel-title">区域流量分布监控</span>
    </div>
    <div ref="chartRef" class="chart-wrapper"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref(null)
let chartInstance = null

const initChart = () => {
  if (!chartRef.value) return

  chartInstance = echarts.init(chartRef.value)

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: '#00cfff',
      textStyle: { color: '#fff' },
      formatter: (params) => {
        let result = params[0].name + '<br/>'
        params.forEach(item => {
          const value = item.seriesName.includes('正常率') ? item.value + '%' : item.value
          result += item.marker + item.seriesName + ': ' + value + '<br/>'
        })
        return result
      }
    },
    grid: {
      left: '2%',
      right: '2%',
      top: '5%',
      bottom: '25%'
    },
    xAxis: {
      type: 'category',
      data: ['BOVMA', 'LMN', 'SAREX', 'VIBOS'],
      axisLine: { lineStyle: { color: 'rgba(0, 207, 255, 0.3)' } },
      axisLabel: { color: '#fff', fontSize: 12 }
    },
    yAxis: [
      {
        type: 'value',
        nameTextStyle: { color: '#fff', fontSize: 12 },
        axisLine: { lineStyle: { color: 'rgba(0, 207, 255, 0.3)' } },
        axisLabel: { color: '#fff', fontSize: 11 },
        splitLine: { lineStyle: { color: 'rgba(0, 207, 255, 0.1)' } },
        min: 0,
      },
      {
        type: 'value',
        nameTextStyle: { color: '#fff', fontSize: 12 },
        axisLine: { lineStyle: { color: 'rgba(255, 204, 0, 0.3)' } },
        axisLabel: { color: '#fff', fontSize: 11, formatter: '{value}%' },
        splitLine: { show: false },
        min: 0,
        max: 100
      }
    ],
    series: [
      {
        name: '实际',
        type: 'bar',
        data: [45, 23, 38, 48],
        barWidth: 14,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            { offset: 0, color: '#0066ff' },
            { offset: 1, color: '#00cfff' }
          ])
        }
      },
      {
        name: '计划',
        type: 'bar',
        data: [45, 23, 38, 48],
        barWidth: 14,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            { offset: 0, color: '#666' },
            { offset: 1, color: '#999' }
          ])
        }
      },
      {
        name: '起飞正常率',
        type: 'line',
        yAxisIndex: 1,
        data: [93, 88, 96, 91],
        lineStyle: { color: '#00ff88', width: 2 },
        itemStyle: { color: '#00ff88' },
        symbol: 'circle',
        symbolSize: 6
      },
      {
        name: '放行正常率',
        type: 'line',
        yAxisIndex: 1,
        data: [86, 82, 89, 85],
        lineStyle: { color: '#ffcc00', width: 2 },
        itemStyle: { color: '#ffcc00' },
        symbol: 'circle',
        symbolSize: 6
      }
    ]
  }

  chartInstance.setOption(option)
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', () => {
    chartInstance?.resize()
  })
})

onUnmounted(() => {
  chartInstance?.dispose()
})
</script>

<style lang="less" scoped>
.mixed-chart-container {
  width: 100%;
  height: 100%;
  background: transparent;
}

.panel-header {
  padding: 4px 12px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.panel-arrows {
  color: #00cfff;
  font-size: 16px;
  letter-spacing: -1px;
}

.panel-title {
  color: #fff;
  font-size: 20px;
}

.chart-wrapper {
  width: 100%;
  height: calc(100% - 50px);
  min-height: 250px;
}
</style>
