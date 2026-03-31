<template>
  <ECharts :options="chartOptions" class="delay-bar-chart" />
</template>

<script setup>
import * as echarts from 'echarts'
import ECharts from '@/components/echarts.vue'

const colors = { gz: '#7B68EE', sz: '#FF6B6B', zh: '#00cfff' }
const xData = ['0-1h', '1-2h', '2-3h', '4h以上']
const gzData = [49, 88, 44, 27]
const szData = [92, 49, 11, 46]
const zhData = [52, 73, 46, 85]

const barW = 16
const dx = 6
const dy = 4
const groupCount = 3
const groupGap = 4

function darken(hex, amount = 60) {
  const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - amount)
  const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - amount)
  const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - amount)
  return `rgb(${r},${g},${b})`
}

function makeBar3D(sIdx, color, data) {
  return {
    type: 'custom',
    name: ['广州', '深圳', '珠海'][sIdx],
    data: data.map((v, i) => [i, v]),
    z: 10 + sIdx,
    renderItem(_p, api) {
      const [catX, topY] = api.coord([api.value(0), api.value(1)])
      const [, bottomY] = api.coord([api.value(0), 0])
      const totalW = groupCount * barW + (groupCount - 1) * groupGap
      const startX = catX - totalW / 2 + sIdx * (barW + groupGap)
      const x = startX
      const h = bottomY - topY

      return {
        type: 'group',
        children: [
          // front face
          {
            type: 'rect',
            shape: { x, y: topY, width: barW, height: h },
            style: {
              fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color },
                { offset: 1, color: darken(color, 80) }
              ])
            }
          },
          // top face
          {
            type: 'polygon',
            shape: {
              points: [[x, topY], [x + dx, topY - dy], [x + barW + dx, topY - dy], [x + barW, topY]]
            },
            style: { fill: color }
          },
          // right face
          {
            type: 'polygon',
            shape: {
              points: [[x + barW, topY], [x + barW + dx, topY - dy], [x + barW + dx, bottomY - dy], [x + barW, bottomY]]
            },
            style: {
              fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: darken(color, 30) },
                { offset: 1, color: darken(color, 100) }
              ])
            }
          },
          // label
          {
            type: 'text',
            style: {
              text: `${api.value(1)}`,
              x: x + barW / 2 + dx / 2,
              y: topY - dy - 12,
              fill: color,
              fontSize: 9,
              textAlign: 'center'
            }
          }
        ]
      }
    }
  }
}

function makeLine(name, val, color) {
  return {
    name: name + '-民航考核标准',
    type: 'line',
    symbol: 'none',
    lineStyle: { color, type: 'dashed', width: 1 },
    data: xData.map(() => val),
    markPoint: {
      symbol: 'rect', symbolSize: 0,
      data: [{ coord: [0, val], value: val, label: { show: true, color, fontSize: 10, position: 'top', formatter: '{c}' } }]
    }
  }
}

const chartOptions = {
  backgroundColor: 'transparent',
  tooltip: { trigger: 'axis' },
  legend: {
    top: 0,
    textStyle: { color: '#8ec6f0', fontSize: 10 },
    itemWidth: 10, itemHeight: 8, itemGap: 8
  },
  grid: { left: 35, right: 30, top: 45, bottom: 20 },
  xAxis: {
    type: 'category',
    data: xData,
    axisLine: { lineStyle: { color: '#1a3c6e' } },
    axisLabel: { color: '#8ec6f0', fontSize: 10 }
  },
  yAxis: {
    type: 'value',
    splitLine: { lineStyle: { color: '#1a3c6e', type: 'dashed' } },
    axisLabel: { color: '#8ec6f0', fontSize: 10 }
  },
  series: [
    makeBar3D(0, colors.gz, gzData),
    makeBar3D(1, colors.sz, szData),
    makeBar3D(2, colors.zh, zhData),
    makeLine('广州', 195, colors.gz),
    makeLine('深圳', 270, colors.sz),
    makeLine('珠海', 160, colors.zh)
  ]
}
</script>

<style lang="less" scoped>
.delay-bar-chart {
  width: 100%;
  height: 100%;
  :deep(.echarts-container) {
    border: none;
    background-color: transparent;
    min-height: 0;
  }
}
</style>
