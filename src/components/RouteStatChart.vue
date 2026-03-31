<template>
  <div class="panel-header">
      <span class="panel-arrows">>>></span>
      <span class="panel-title">空域单元统计</span>
    </div>
  <div class="route-stat-chart">
    <Echarts :options="chartOptions1" class="chart-container" />
    <Echarts :options="chartOptions2" class="chart-container" />
    <Echarts :options="chartOptions3" class="chart-container" />
  </div>
  
</template>

<script setup>
import { computed } from 'vue'
import Echarts from './echarts.vue'

const chartData1 = {
  categories: ['W45', 'W56', 'A593'],
  series: [
    { name: '广州', data: [320, 230, 120], color: '#9B6BFF' },
    { name: '深圳', data: [120, 100, 90], color: '#FF6B6B' },
    { name: '珠海', data: [80, 72, 61], color: '#4BDDFF' }
  ]
}
const chartData2 = {
  categories: ['AGVIL', 'BOVMA', 'LMN'],
  series: [
    { name: '广州', data: [320, 230, 120], color: '#9B6BFF' },
    { name: '深圳', data: [120, 100, 90], color: '#FF6B6B' },
    { name: '珠海', data: [80, 72, 61], color: '#4BDDFF' }
  ]
}
const chartData3 = {
  categories: ['AP01', 'AP03', 'AP08'],
  series: [
    { name: '广州', data: [320, 230, 120], color: '#9B6BFF' },
    { name: '深圳', data: [120, 100, 90], color: '#FF6B6B' },
    { name: '珠海', data: [80, 72, 61], color: '#4BDDFF' }
  ]
}
const chartOptions1 = computed(() => ({
  backgroundColor: 'transparent',
  legend: {
    data: chartData1.series.map(item => item.name),
    left: 'center',
    top: '5%',
    textStyle: { color: '#fff', fontSize: 12 },
    itemWidth: 14,
    itemHeight: 10
  },
  title: {
    text: '航路统计',
    right: '10',
    top: '10',
    textStyle: { color: '#00cfff', fontSize: 14 }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    backgroundColor: 'rgba(10, 20, 40, 0.9)',
    borderColor: '#00cfff',
    borderWidth: 1,
    textStyle: { color: '#fff' }
  },
  grid: {
    left: '20%',
    right: '10%',
    top: '20%',
    bottom: '15%'
  },
  xAxis: {
    type: 'category',
    data: chartData1.categories,
    axisLine: { lineStyle: { color: 'rgba(0, 207, 255, 0.3)' } },
    axisLabel: { color: '#fff', fontSize: 12 }
  },
  yAxis: {
    type: 'value',
    name: '架次',
    nameTextStyle: { color: '#fff', fontSize: 14 },
    splitLine: { lineStyle: { color: 'rgba(0, 207, 255, 0.1)', type: 'dashed' } },
    axisLabel: { color: '#fff', fontSize: 12 },
  },
  series: chartData1.series.map(item => ({
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
const chartOptions2 = computed(() => ({
  backgroundColor: 'transparent',
  title: {
    text: '航路点统计',
    right: '10',
    top: '10',
    textStyle: { color: '#00cfff', fontSize: 14 }
  },
  legend: {
    data: chartData2.series.map(item => item.name),
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
    textStyle: { color: '#fff' }
  },
  grid: {
    left: '20%',
    right: '10%',
    top: '20%',
    bottom: '15%'
  },
  xAxis: {
    type: 'category',
    data: chartData2.categories,
    axisLine: { lineStyle: { color: 'rgba(0, 207, 255, 0.3)' } },
    axisLabel: { color: '#fff', fontSize: 12 }
  },
  yAxis: {
    type: 'value',
    name: '架次',
    nameTextStyle: { color: '#fff', fontSize: 14, },
    splitLine: { lineStyle: { color: 'rgba(0, 207, 255, 0.1)', type: 'dashed' } },
    axisLabel: { color: '#fff', fontSize: 12 },
  },
  barCategoryGap: '40%',
  series: chartData2.series.map(item => ({
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
const chartOptions3 = computed(() => ({
  backgroundColor: 'transparent',
  title: {
    text: '扇区统计',
    right: '10',
    top: '10',
    textStyle: { color: '#00cfff', fontSize: 14 }
  },
  legend: {
    data: chartData3.series.map(item => item.name),
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
    textStyle: { color: '#fff' }
  },
  grid: {
    left: '20%',
    right: '10%',
    top: '20%',
    bottom: '15%'
  },
  xAxis: {
    type: 'category',
    data: chartData3.categories,
    axisLine: { lineStyle: { color: 'rgba(0, 207, 255, 0.3)' } },
    axisLabel: { color: '#fff', fontSize: 12 }
  },
  yAxis: {
    type: 'value',
    name: '架次',
    nameTextStyle: { color: '#fff', fontSize: 14, },
    splitLine: { lineStyle: { color: 'rgba(0, 207, 255, 0.1)', type: 'dashed' } },
    axisLabel: { color: '#fff', fontSize: 12 },
  },
  series: chartData3.series.map(item => ({
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
.panel-header {
  padding: 4px 12px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;

}

.panel-arrows {
  color: #00cfff;
  font-size: 12px;
  letter-spacing: -1px;
}

.panel-title {
  color: #BADFFC;
  font-size: 20px;
  letter-spacing: 0px;
}

</style>
