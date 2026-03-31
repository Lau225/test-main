<template>
  <ECharts :options="chartOptions" class="bar-chart-3d" />
</template>

<script setup>
import * as echarts from 'echarts'
import ECharts from '@/components/echarts.vue'

const props = defineProps({
  xData: { type: Array, default: () => ['广州', '深圳', '珠海'] },
  seriesData: {
    type: Array,
    default: () => [
      { name: '当月累计起飞', data: [120, 200, 150] },
    ]
  },
  lineData: { type: Array, default: () => [200, 180, 220] }
})

const colors = ['#7B6FCC', '#3AB5C8']
const cylRx = 14
const cylRy = 5


function darken(hex) {
  const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - 80)
  const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - 80)
  const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - 80)
  return `rgb(${r},${g},${b})`
}

// offset: -1 for left bar, +1 for right bar
const makeCylBody = (c, offset) => (_p, api) => {
  const top = api.coord([api.value(0), api.value(1)])
  const bottom = api.coord([api.value(0), 0])
  const cx = top[0] + offset * (cylRx + 2)
  return {
    type: 'rect',
    shape: { x: cx - cylRx, y: top[1], width: cylRx * 2, height: bottom[1] - top[1] },
    style: { fill: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
      { offset: 0, color: darken(c) }, { offset: 0.5, color: c }, { offset: 1, color: darken(c) }
    ]) }
  }
}
const makeCylBottom = (c, offset) => (_p, api) => {
  const b = api.coord([api.value(0), 0])
  return { type: 'ellipse', shape: { cx: b[0] + offset * (cylRx + 2), cy: b[1], rx: cylRx, ry: cylRy }, style: { fill: darken(c) } }
}
const makeCylTop = (c, offset) => (_p, api) => {
  const t = api.coord([api.value(0), api.value(1)])
  return { type: 'ellipse', shape: { cx: t[0] + offset * (cylRx + 2), cy: t[1], rx: cylRx, ry: cylRy }, style: { fill: c } }
}

const chartOptions = {
  backgroundColor: 'transparent',
  tooltip: { confine: true },
  legend: {
    show: true,
    top: 0,
    left: 'center',
    textStyle: { color: '#8ec6f0', fontSize: 12 },
    itemWidth: 14,
    itemHeight: 10,
    data: [
      ...props.seriesData.map((s, i) => ({ name: s.name, itemStyle: { color: colors[i] } })),
      { name: '民航局考核标准', itemStyle: { color: '#d07b7a' } }
    ]
  },
  xAxis: {
    type: 'category',
    data: props.xData,
    axisLine: { lineStyle: { color: '#1a3c6e' } },
    axisLabel: { color: '#8ec6f0' },
    boundaryGap: true
  },
  yAxis: {
    type: 'value',
    splitLine: { lineStyle: { color: '#1a3c6e', type: 'dashed' } },
    axisLabel: { color: '#8ec6f0' }
  },
  grid: { left: 0, right: 40, top: 50, bottom: 40 },
  series: [
    ...props.seriesData.flatMap((s, si) => {
      const c = colors[si]
      const offset = props.seriesData.length === 1 ? 0 : (si === 0 ? -1 : 1)
      const d = s.data.map((v, i) => [props.xData[i], v])
      return [
        { name: s.name, type: 'custom', renderItem: makeCylBottom(c, offset), data: d, z: 1 },
        { name: s.name, type: 'custom', renderItem: makeCylBody(c, offset), data: d, z: 2 },
        { name: s.name, type: 'custom', renderItem: makeCylTop(c, offset), data: d, z: 3 },
        {
          name: s.name,
          type: 'custom',
          renderItem: ((_p, api) => {
            const t = api.coord([api.value(0), api.value(1)])
            return {
              type: 'text',
              x: t[0] + offset * (cylRx + 2),
              y: t[1] - 10,
              style: { text: api.value(1), fill: '#fff', fontSize: 12, textAlign: 'center' }
            }
          }),
          data: d,
          z: 4
        }
      ]
    }),
    {
      name: '民航局考核标准',
      type: 'line',
      data: props.xData.map(() => 200),
      symbol: 'circle',
      symbolSize: 6,
      smooth: true,
      lineStyle: { color: '#d07b7a', width: 2 },
      itemStyle: { color: '#d07b7a' },
      z: 4
    }
  ]
}
</script>

<style lang="less" scoped>
.bar-chart-3d {
  width: 100%;
  height: 100%;
  :deep(.echarts-container) {
    border: none;
    background-color: transparent;
    min-height: 0;
  }
}
</style>
