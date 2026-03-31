<template>
  <div class="flight-execution-panel">
    <div class="panel-header">
      <span class="panel-arrows">>>></span>
      <span class="panel-title">航班执行情况</span>
    </div>

    <div class="indicators">
      <div class="indicator-row">
        <div class="indicator-item">
          <span class="label">计划</span>
          <span class="value">100</span>
        </div>
        <div class="indicator-item">
          <span class="label">已执行</span>
          <span class="value">90</span>
        </div>
        <div class="indicator-item">
          <span class="label">备降</span>
          <span class="value">1</span>
        </div>
        <div class="indicator-item">
          <span class="label">取消</span>
          <span class="value">2</span>
        </div>
      </div>
      <div class="indicator-row">
        <div class="indicator-item">
          <span class="label">调时</span>
          <span class="value">5架</span>
        </div>
        <div class="indicator-item">
          <span class="label">调减</span>
          <span class="value">3架</span>
        </div>
        <div class="indicator-item">
          <span class="label">当前在港</span>
          <span class="value">28架 <span class="trend-up">↑15</span></span>
        </div>
      </div>
    </div>

    <div ref="chartRef" class="chart-wrapper"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref(null)
let chartInstance = null

// 计算当前时间信息
const getCurrentTimeInfo = () => {
  const now = new Date()
  const hour = now.getHours()
  const minute = now.getMinutes()

  // 确定时间段索引 (0-4h=0, 4-8h=1, 8-12h=2, 12-16h=3, 16-20h=4, 20-24h=5)
  const segmentIndex = Math.floor(hour / 4)

  // 计算在当前时间段内的百分比
  const segmentStartHour = segmentIndex * 4
  const hourInSegment = hour - segmentStartHour
  const percentage = (hourInSegment * 60 + minute) / (4 * 60)

  return { segmentIndex, percentage }
}

const initChart = () => {
  if (!chartRef.value) return

  chartInstance = echarts.init(chartRef.value)

  const xAxisData = ['0-4h', '4-8h', '8-12h', '12-16h', '16-20h', '20-24h']
  const { segmentIndex, percentage } = getCurrentTimeInfo()

  // 模拟完整数据（实际应从接口获取）
  const fullOutboundData = [15, 18, 18, 20, 22, 19]
  const fullInboundData = [12, 15, 16, 18, 20, 17]

  // 根据当前时间动态分配实际和计划数据
  const outboundActual = fullOutboundData.map((val, idx) => idx < segmentIndex ? val : null)
  const inboundActual = fullInboundData.map((val, idx) => idx < segmentIndex ? -val : null)
  const outboundPlan = fullOutboundData.map((val, idx) => idx >= segmentIndex ? val : null)
  const inboundPlan = fullInboundData.map((val, idx) => idx >= segmentIndex ? -val : null)

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
          if (item.value == null) return
          if (item.seriesName.includes('正常率')) {
            result += item.marker + item.seriesName + ': ' + item.value + '%<br/>'
          } else {
            const absValue = Math.abs(item.value)
            result += item.marker + item.seriesName + ': ' + absValue + '<br/>'
          }
        })
        return result
      }
    },
    grid: {
      left: '8%',
      right: '8%',
      top: '8%',
      bottom: '20%'
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLine: { lineStyle: { color: 'rgba(0, 207, 255, 0.3)' } },
      axisLabel: { color: '#fff', fontSize: 11 }
    },
    yAxis: [
      {
        type: 'value',
        nameTextStyle: { color: '#fff', fontSize: 11 },
        axisLine: { lineStyle: { color: 'rgba(0, 207, 255, 0.3)' } },
        axisLabel: {
          color: '#fff',
          fontSize: 10,
          formatter: (value) => Math.abs(value)
        },
        splitLine: { lineStyle: { color: 'rgba(0, 207, 255, 0.1)' } }
      },
      {
        type: 'value',
        nameTextStyle: { color: '#fff', fontSize: 11 },
        axisLine: { lineStyle: { color: 'rgba(255, 204, 0, 0.3)' } },
        axisLabel: { color: '#fff', fontSize: 10, formatter: '{value}%' },
        splitLine: { show: false },
        min: 0,
        max: 100
      }
    ],
    series: [
      {
        name: '出港实际量',
        type: 'bar',
        data: outboundActual,
        barWidth: 16,
        barGap: '-100%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            { offset: 0, color: '#0066ff' },
            { offset: 1, color: '#00cfff' }
          ])
        }
      },
      {
        name: '入港实际量',
        type: 'bar',
        data: inboundActual,
        barWidth: 16,
        barGap: '-100%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#ff6b00' },
            { offset: 1, color: '#ffaa00' }
          ])
        }
      },
      {
        name: '出港计划量',
        type: 'bar',
        data: outboundPlan,
        barWidth: 16,
        barGap: '-100%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            { offset: 0, color: '#666' },
            { offset: 1, color: '#999' }
          ])
        },
        markLine: {
          symbol: 'none',
          data: [{
            xAxis: segmentIndex + percentage,
            lineStyle: {
              type: 'dashed',
              color: '#00cfff',
              width: 2
            }
          }],
          label: { show: false }
        }
      },
      {
        name: '入港计划量',
        type: 'bar',
        data: inboundPlan,
        barWidth: 16,
        barGap: '-100%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#9966ff' },
            { offset: 1, color: '#cc99ff' }
          ])
        }
      },
      {
        name: '始发正常率',
        type: 'line',
        yAxisIndex: 1,
        data: [92, 88, 90, 93, 91, 89],
        lineStyle: { color: '#ff6b9d', width: 2 },
        itemStyle: { color: '#ff6b9d' },
        symbol: 'circle',
        symbolSize: 6
      },
      {
        name: '起飞正常率',
        type: 'line',
        yAxisIndex: 1,
        data: [90, 85, 88, 91, 89, 87],
        lineStyle: { color: '#00ff88', width: 2 },
        itemStyle: { color: '#00ff88' },
        symbol: 'circle',
        symbolSize: 6
      },
      {
        name: '放行正常率',
        type: 'line',
        yAxisIndex: 1,
        data: [88, 83, 86, 89, 87, 85],
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
.flight-execution-panel {
  width: 100%;
  height: 100%;

}

.panel-header {
  padding: 4px 8px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.panel-arrows {
  color: #00cfff;
  font-size: 14px;
  letter-spacing: -1px;
}

.panel-title {
  color: #fff;
  font-size: 20px;
}

.indicators {
  margin-bottom: 12px;
}

.indicator-row {
  display: flex;
  gap: 8px;
  margin-bottom: 6px;
}

.indicator-item {
  flex: 1;
  background: rgba(0, 100, 150, 0.2);
  border: 1px solid rgba(0, 207, 255, 0.3);
  padding: 6px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.indicator-item .label {
  color: #00cfff;
  font-size: 14px;
}

.indicator-item .value {
  color: #fff;
  font-size: 14px;
  font-weight: bold;
}

.trend-up {
  color: #00ff88;
  font-size: 12px;
  margin-left: 4px;
}

.chart-wrapper {
  width: 100%;
  height: calc(100% - 140px);
  min-height: 200px;
}
</style>
