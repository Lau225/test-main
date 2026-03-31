<template>
  <div class="route-stat-chart">
    <Echarts :options="chartOptions1" class="chart-container" />
  </div>
  
</template>

<script setup>
import { computed } from 'vue'
import Echarts from './echarts.vue'

const chartData = {
  categories: ['AP01', 'AP02', 'AP08', 'W56', 'W45', 'A593', 'AGVIL', 'IDUMA', 'P50'],
  series: [
    { name: '广州', data: [320, 280, 250, 200, 180, 160, 140, 120, 100], color: '#9B6BFF' },
    { name: '深圳', data: [120, 110, 100, 90, 85, 80, 75, 70, 65], color: '#FF6B6B' },
    { name: '珠海', data: [80, 75, 70, 65, 60, 55, 50, 45, 40], color: '#4BDDFF' }
  ]
}
const chartOptions1 = computed(() => ({
  backgroundColor: 'transparent',
  legend: {
    data: chartData.series.map(item => item.name),
    left: 'center',
    top: '5%',
    textStyle: { color: '#fff', fontSize: 12 },
    itemWidth: 14,
    itemHeight: 10
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    backgroundColor: 'rgba(10, 20, 40, 0.9)',
    borderColor: '#00cfff',
    borderWidth: 1,
    textStyle: { color: '#fff' },
    confine: true
  },
  grid: {
    left: '3%',
    right: '4%',
    top: '20%',
    bottom: '10%',
    containLabel: true
  },
  barCategoryGap: '40%',
  xAxis: {
    type: 'category',
    data: chartData.categories,
    axisLine: { lineStyle: { color: 'rgba(0, 207, 255, 0.3)' } },
    axisLabel: { color: '#fff', fontSize: 12 }
  },
  yAxis: {
    type: 'value',
    name: '延误时长',
    nameLocation: 'end',
    nameGap: 10,
    nameTextStyle: { color: '#fff', fontSize: 12},
    splitLine: { lineStyle: { color: 'rgba(0, 207, 255, 0.1)', type: 'dashed' } },
    axisLabel: { color: '#fff', fontSize: 12 },
  },
  series: chartData.series.map(item => ({
    name: item.name,
    type: 'bar',
    data: item.data,
    itemStyle: { color: item.color },
    barWidth: '15%',
    label: {
        show: true,
        position: 'top'
      },
  }))
}))
</script>

<style lang="less" scoped>
.route-stat-chart {
  width: 100%;
  height: 100%;
  background: transparent;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.chart-title-left {
  color: #fff;
  font-size: 16px;
}

.chart-title-right {
  color: #00cfff;
  font-size: 14px;
}

.chart-container {
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
}

</style>
