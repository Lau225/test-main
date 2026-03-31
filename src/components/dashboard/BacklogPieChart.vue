<template>
  <div class="backlog-pie">
    <div class="legend-bar">
      <span class="legend-city">深圳</span>
      <span v-for="(item, i) in pieData" :key="i" class="legend-item">
        <i class="legend-dot" :style="{ background: item.color }"></i>
        {{ item.name }}<b>{{ item.value }}</b>
      </span>
    </div>
    <div class="chart-wrap">
      <ECharts :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ECharts from '@/components/echarts.vue'

const pieData = [
  { name: 'SUMIB', value: 33, color: '#3584f7' },
  { name: 'LMN-1D', value: 34, color: '#f5a623' },
  { name: 'YIN-91D', value: 39, color: '#a45cff' },
  { name: 'SAREX-1B', value: 69, color: '#f2637b' },
  { name: 'VIBOS', value: 40, color: '#22d3ee' }
]

const chartOptions = computed(() => ({
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderColor: 'rgba(0,207,255,0.3)',
    textStyle: { color: '#fff', fontSize: 12 }
  },
  graphic: [
    // 中心泡泡 - 外圈光晕
    {
      type: 'circle',
      shape: { cx: 0, cy: 0, r: 68 },
      left: 'center',
      top: 'center',
      style: {
        fill: {
          type: 'radial',
          x: 0.5, y: 0.5, r: 0.5,
          colorStops: [
            { offset: 0, color: 'rgba(53,132,247,0.0)' },
            { offset: 0.7, color: 'rgba(53,132,247,0.05)' },
            { offset: 1, color: 'rgba(53,132,247,0.15)' }
          ]
        }
      }
    },
    // 中心泡泡 - 主体
    {
      type: 'circle',
      shape: { cx: 0, cy: 0, r: 52 },
      left: 'center',
      top: 'center',
      style: {
        fill: {
          type: 'radial',
          x: 0.4, y: 0.35, r: 0.6,
          colorStops: [
            { offset: 0, color: 'rgba(100,180,255,0.45)' },
            { offset: 0.5, color: 'rgba(40,100,220,0.35)' },
            { offset: 1, color: 'rgba(20,50,150,0.5)' }
          ]
        },
        shadowColor: 'rgba(53,132,247,0.5)',
        shadowBlur: 20
      }
    },
    // 泡泡高光
    {
      type: 'circle',
      shape: { cx: -12, cy: -14, r: 18 },
      left: 'center',
      top: 'center',
      style: {
        fill: {
          type: 'radial',
          x: 0.5, y: 0.5, r: 0.5,
          colorStops: [
            { offset: 0, color: 'rgba(180,220,255,0.4)' },
            { offset: 1, color: 'rgba(180,220,255,0)' }
          ]
        }
      }
    },
    // 数字
    {
      type: 'text',
      left: 'center',
      top: '40%',
      style: {
        text: '12',
        fill: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        textVerticalAlign: 'middle'
      }
    },
    // 标签
    {
      type: 'text',
      left: 'center',
      top: '53%',
      style: {
        text: '积压航班',
        fill: 'rgba(255,255,255,0.6)',
        fontSize: 12,
        textAlign: 'center',
        textVerticalAlign: 'middle'
      }
    }
  ],
  series: [
    // 主数据环
    {
      type: 'pie',
      radius: ['40%', '50%'],
      center: ['50%', '50%'],
      avoidLabelOverlap: true,
      itemStyle: {
        borderColor: '#0a0e27',
        borderWidth: 3
      },
      label: {
        show: true,
        formatter: (params) => {
          return `{name|${params.name}}\n{value|${params.value}}{unit|架}  {per|${params.percent}%}`
        },
        rich: {
          name: {
            fontSize: 14,
            color: 'rgba(255,255,255,0.8)',
            padding: [0, 0, 4, 0]
          },
          value: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#fff'
          },
          unit: {
            fontSize: 13,
            color: 'rgba(255,255,255,0.5)'
          },
          per: {
            fontSize: 13,
            color: 'rgba(255,255,255,0.5)'
          }
        }
      },
      labelLine: {
        show: true,
        length: 12,
        length2: 18,
        lineStyle: {
          color: 'rgba(255,255,255,0.25)',
          type: 'dashed'
        }
      },
      data: pieData.map(d => ({
        name: d.name,
        value: d.value,
        itemStyle: { color: d.color }
      }))
    },
    // 外圈发光环（同数据，更大半径，低透明度）
    {
      type: 'pie',
      radius: ['53%', '58%'],
      center: ['50%', '50%'],
      silent: true,
      label: { show: false },
      labelLine: { show: false },
      itemStyle: {
        borderColor: '#0a0e27',
        borderWidth: 2,
        opacity: 0.2
      },
      data: pieData.map(d => ({
        name: d.name,
        value: d.value,
        itemStyle: { color: d.color }
      }))
    }
  ]
}))
</script>

<style lang="less" scoped>
.backlog-pie {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.legend-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 14px;
  padding: 4px 4px 8px;
}

.legend-city {
  color: #00cfff;
  font-size: 14px;
  font-weight: bold;
  margin-right: 4px;
}

.legend-item {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
  gap: 4px;

  b {
    color: #fff;
    font-size: 13px;
    margin-left: 2px;
  }
}

.legend-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.chart-wrap {
  position:relative;
  top:-20px;
  flex: 1;
  min-height: 0;
  display: flex;
}
</style>
