<template>
  <div class="cumulative-delay">
    <div v-for="(city, i) in cities" :key="i" class="city-block">
      <div class="city-name"><span class="tri">▶</span>{{ city.name }}</div>
      <div class="chart-wrap">
        <ECharts :options="makeOption(city)" class="pie-chart" />
      </div>
    </div>
  </div>
</template>

<script setup>
import ECharts from '@/components/echarts.vue'

const cities = [
  { name: '广州', total: 1980, mainColor: '#7B68EE', delay2h: 14, delay4h: 8 },
  { name: '深圳', total: 2150, mainColor: '#FF6B6B', delay2h: 12, delay4h: 6 },
  { name: '珠海', total: 1560, mainColor: '#00cfff', delay2h: 10, delay4h: 5 }
]

function makeOption(city) {
  const normal = 100 - city.delay2h - city.delay4h
  const center = ['60%', '45%']
  const startAngle = 160

  return {
    backgroundColor: 'transparent',
    series: [
      {
        type: 'pie',
        radius: ['30%', '58%'],
        center,
        startAngle,
        label: { show: false },
        labelLine: { show: false },
        itemStyle: { borderColor: '#0a0e27', borderWidth: 2 },
        silent: true,
        data: [
          {
            value: normal,
            itemStyle: { color: city.mainColor },
            label: {
              show: true,
              overflow: 'none',
              formatter: `{total|${city.total}}`,
              rich: {
                total: { color: '#fff', fontSize: 12, fontWeight: 'bold', lineHeight: 15 },
                sub: { color: 'rgba(255,255,255,0.4)', fontSize: 8, lineHeight: 12 }
              }
            },
            labelLine: {
              show: true,
              lineStyle: { color: 'rgba(255,255,255,0.3)', type: 'dashed', width: 1 },
              length: 6, length2: 8
            }
          },
          {
            value: city.delay2h,
            itemStyle: { color: '#00cfff' },
            label: { show: true, position: 'inside', formatter: `${city.delay2h}%`, fontSize: 9, color: '#fff', fontWeight: 'bold' }
          },
          {
            value: city.delay4h,
            itemStyle: { color: '#f5a623' },
            label: { show: true, position: 'inside', formatter: `${city.delay4h}%`, fontSize: 9, color: '#fff', fontWeight: 'bold' }
          }
        ]
      },
      {
        type: 'pie',
        radius: ['58%', '68%'],
        center,
        startAngle,
        avoidLabelOverlap: true,
        silent: true,
        data: [
          {
            value: normal,
            itemStyle: { color: 'transparent', borderWidth: 0 },
            label: { show: false },
            labelLine: { show: false }
          },
          {
            value: city.delay2h,
            itemStyle: { color: 'rgba(0,207,255,0.2)', borderColor: '#00cfff', borderWidth: 1, borderType: 'dashed' },
            label: {
              show: true,
              overflow: 'none',
              formatter: `{name|延误2h}\n{std|民航标准20%}`,
              rich: {
                name: { color: '#f5a623', fontSize: 10, lineHeight: 14 },
                std: { color: 'rgba(255,255,255,0.35)', fontSize: 9, lineHeight: 13 }
              }
            },
            labelLine: {
              show: true,
              lineStyle: { color: 'rgba(255,255,255,0.4)', type: 'dashed', width: 1 },
              length: 6, length2: 8
            }
          },
          {
            value: city.delay4h,
            itemStyle: { color: 'rgba(245,166,35,0.2)', borderColor: '#f5a623', borderWidth: 1, borderType: 'dashed' },
            label: {
              show: true,
              overflow: 'none',
              formatter: `{name|延误4h以上}\n{std|民航标准20%}`,
              rich: {
                name: { color: '#f5a623', fontSize: 10, lineHeight: 14 },
                std: { color: 'rgba(255,255,255,0.35)', fontSize: 9, lineHeight: 13 }
              }
            },
            labelLine: {
              show: true,
              lineStyle: { color: 'rgba(255,255,255,0.4)', type: 'dashed', width: 1 },
              length: 6, length2: 1
            }
          }
        ]
      }
    ]
  }
}
</script>

<style lang="less" scoped>
.cumulative-delay {
  width: 100%;
  height: 100%;
  display: flex;
}
.city-block {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.city-name {
  font-size: 12px;
  color: #8ec6f0;
  padding-left: 8px;
  .tri {
    color: #f5a623;
    font-size: 8px;
    margin-right: 4px;
  }
}
.chart-wrap {
  flex: 1;
  position: relative;
  min-height: 0;
}
.pie-chart {
  width: 100%;
  height: 100%;
  :deep(.echarts-container) {
    border: none;
    background-color: transparent;
    min-height: 0;
    clip-path: none;
  }
}
</style>
