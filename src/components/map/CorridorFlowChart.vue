<template>
  <div class="panel-header">
    <span class="panel-arrows">>>></span>  
    <span class="panel-title">航班情况</span>
    </div>
  <div class="corridor-chart-container">
    <div class="filter-buttons">
      <div
        v-for="item in filterOptions"
        :key="item.key"
        class="filter-btn"
        :class="{ active: activeFilter === item.key }"
        @click="changeFilter(item.key)"
      >
        <span class="btn-label">{{ item.label }}</span>
        <span class="btn-count">({{ item.count }})</span>
      </div>
    </div>
    <div ref="chartRef" class="chart-wrapper"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref(null)
let chartInstance = null
const activeFilter = ref('all')

const filterOptions = ref([
  { key: 'all', label: '全部', count: 20 },
  { key: 'boarding', label: '登机', count: 8 },
  { key: 'boarded', label: '已登机', count: 6 },
  { key: 'waitPush', label: '待推出', count: 4 },
  { key: 'waitTakeoff', label: '待起飞', count: 2 }
])

// 模拟不同状态的数据
const mockData = {
  all: [20, 18, 22, 16],
  boarding: [8, 6, 9, 7],
  boarded: [6, 7, 5, 8],
  waitPush: [4, 3, 5, 2],
  waitTakeoff: [2, 2, 3, 1]
}

const initChart = () => {
  if (!chartRef.value) return

  chartInstance = echarts.init(chartRef.value)
  updateChart()
}

const updateChart = () => {
  const data = mockData[activeFilter.value]

  const option = {
    backgroundColor: 'transparent',
    grid: {
      left: '24%',
      right: '10%',
      top: '10%',
      bottom: '10%'
    },
    xAxis: {
      type: 'value',
      axisLine: {
        lineStyle: { color: 'rgba(0, 207, 255, 0.3)' }
      },
      axisLabel: {
        color: '#fff',
        fontSize: 12
      },
      splitLine: {
        lineStyle: { color: 'rgba(0, 207, 255, 0.1)' }
      }
    },
    yAxis: {
      type: 'category',
      data: ['BOVMA', 'LMN', 'SAREX', 'VIBOS'],
      axisLine: {
        lineStyle: { color: 'rgba(0, 207, 255, 0.3)' }
      },
      axisLabel: {
        color: '#fff',
        fontSize: 13
      }
    },
    series: [
      {
        type: 'bar',
        data: data,
        barWidth: 16,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
            { offset: 0, color: '#00cfff' },
            { offset: 1, color: '#0066ff' }
          ]),
          borderRadius: [0, 4, 4, 0]
        },
        label: {
          show: true,
          position: 'right',
          color: '#00cfff',
          fontSize: 12
        }
      }
    ]
  }

  chartInstance.setOption(option)
}

const changeFilter = (key) => {
  activeFilter.value = key
  updateChart()
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
.corridor-chart-container {
  width: 100%;
  height: 100%;
  background: transparent;
  border-radius: 8px;

}

.filter-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 6px 10px;
  background: rgba(0, 207, 255, 0.1);
  border: 1px solid rgba(0, 207, 255, 0.3);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 13px;

  &:hover {
    background: rgba(0, 207, 255, 0.2);
    border-color: rgba(0, 207, 255, 0.5);
  }

  &.active {
    background: rgba(0, 207, 255, 0.3);
    border-color: #00cfff;
    box-shadow: 0 0 10px rgba(0, 207, 255, 0.4);
  }
}

.btn-label {
  color: #fff;
  margin-right: 4px;
}

.btn-count {
  color: #00cfff;
  font-weight: bold;
}

.chart-wrapper {
  width: 100%;
  height: calc(100% - 50px);
  min-height: 200px;
}
.panel-header {
    padding: 4px 12px;
    margin-bottom: 6px;
    margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
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
    letter-spacing: 0px;
  }
</style>
