<template>
  <div class="backlog-panel">
    <div class="panel-header">
      <span class="panel-arrows">>>></span>
      <span class="panel-title">积压航班情况</span>
    </div>

    <!-- 顶部数据展示 -->
    <div class="data-summary">
      <div class="summary-row">
        <span class="summary-label">起飞延误：</span>
        <span class="summary-value">80</span>
        <span class="summary-detail">(受控延误60，不受控延误20)</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">平均起飞延误时长：</span>
        <span class="summary-value">30分钟</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">积压航班：</span>
        <span class="summary-value">10</span>
        <span class="summary-detail" style="margin-left: 20px;">积压航班平均延误时长：</span>
        <span class="summary-value">40分钟</span>
      </div>
    </div>

    <!-- 底部两个图表 -->
    <div class="charts-row">
      <div class="chart-item">
        <div class="chart-title">起飞延误</div>
        <div ref="chart1Ref" class="chart-box"></div>
      </div>
      <div class="chart-item">
        <div class="chart-title">积压延误</div>
        <div ref="chart2Ref" class="chart-box"></div>
      </div>
    </div>

    <!-- 中部表格 -->
    <div class="table-section">
      <el-table
        :data="tableData"
        border
        :default-sort="{ prop: 'controlledCount', order: 'descending' }"
        style="width: 100%"
        :header-cell-style="headerCellStyle"
        :cell-style="cellStyle"
      >
        <el-table-column :label="portType" width="70">
          <template #header>
            <span class="port-toggle" @click="togglePortType">{{ portType }}</span>
          </template>
          <template #default="scope">
            <el-tooltip :content="scope.row.name" placement="top" effect="light">
              <div class="text-ellipsis">{{ scope.row.name }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="avgDelay" label="平均延误时长"  width="100" />
        <el-table-column prop="maxDelay" label="最大延误时长"  width="100" />
        <el-table-column prop="controlledCount" label="受控航班数" sortable width="110"/>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const chart1Ref = ref(null)
const chart2Ref = ref(null)
let chart1Instance = null
let chart2Instance = null

const portType = ref('进港')

// 模拟表格数据
const tableData = ref([
  { name: '过BIGRO点去LH S0840高度禁用', avgDelay: '35分钟', maxDelay: '120分钟', controlledCount: 15 },
  { name: 'ZGHZ起飞 过BOVMA，LMN，TEPID点15分钟一架', avgDelay: '28分钟', maxDelay: '90分钟', controlledCount: 12 },
  { name: '过VIBOS点ZGGG起飞5分钟', avgDelay: '42分钟', maxDelay: '150分钟', controlledCount: 18 },
  { name: '过QP点ZGGG起飞3分钟', avgDelay: '30分钟', maxDelay: '100分钟', controlledCount: 10 }
])

const togglePortType = () => {
  portType.value = portType.value === '进港' ? '出港' : '进港'
  // 这里可以调用接口更新数据
}

const headerCellStyle = {
  background: 'rgba(0, 207, 255, 0.1)',
  color: '#00cfff',
  fontSize: '12px',
  borderColor: 'rgba(0, 207, 255, 0.2)'
}

const cellStyle = {
  background: 'transparent',
  color: '#fff',
  fontSize: '12px',
  borderColor: 'rgba(0, 207, 255, 0.1)'
}

const initCharts = () => {
  if (!chart1Ref.value || !chart2Ref.value) return

  chart1Instance = echarts.init(chart1Ref.value)
  chart2Instance = echarts.init(chart2Ref.value)

  const option1 = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: '#00cfff',
      textStyle: { color: '#fff' }
    },
    grid: { left: '15%', right: '10%', top: '15%', bottom: '15%' },
    xAxis: {
      type: 'category',
      data: ['0-1h', '1-2h', '2-3h', '4h以上'],
      axisLine: { lineStyle: { color: 'rgba(0, 207, 255, 0.3)' } },
      axisLabel: { color: '#fff', fontSize: 11 }
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: 'rgba(0, 207, 255, 0.3)' } },
      axisLabel: { color: '#fff', fontSize: 11 },
      splitLine: { lineStyle: { color: 'rgba(0, 207, 255, 0.1)' } }
    },
    series: [{
      type: 'bar',
      data: [25, 30, 15, 10],
      barWidth: 20,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
          { offset: 0, color: '#0066ff' },
          { offset: 1, color: '#00cfff' }
        ]),
        borderRadius: [4, 4, 0, 0]
      }
    }]
  }

  const option2 = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: '#ffcc00',
      textStyle: { color: '#fff' }
    },
    grid: { left: '15%', right: '10%', top: '15%', bottom: '15%' },
    xAxis: {
      type: 'category',
      data: ['0.5h', '1h', '2h', '2h以上'],
      axisLine: { lineStyle: { color: 'rgba(0, 207, 255, 0.3)' } },
      axisLabel: { color: '#fff', fontSize: 11 }
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: 'rgba(0, 207, 255, 0.3)' } },
      axisLabel: { color: '#fff', fontSize: 11 },
      splitLine: { lineStyle: { color: 'rgba(0, 207, 255, 0.1)' } }
    },
    series: [{
      type: 'bar',
      data: [3, 4, 2, 1],
      barWidth: 20,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
          { offset: 0, color: '#ff6600' },
          { offset: 1, color: '#ffcc00' }
        ]),
        borderRadius: [4, 4, 0, 0]
      }
    }]
  }

  chart1Instance.setOption(option1)
  chart2Instance.setOption(option2)
}

onMounted(() => {
  initCharts()
  window.addEventListener('resize', () => {
    chart1Instance?.resize()
    chart2Instance?.resize()
  })
})

onUnmounted(() => {
  chart1Instance?.dispose()
  chart2Instance?.dispose()
})
</script>

<style lang="less" scoped>
.backlog-panel {
  width: 100%;
  height: 100%;
  background: transparent;
  position:relative;
}

.panel-header {
  position:absolute;
  left:25px;
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

.data-summary {
  position:absolute;
  background: rgba(0, 207, 255, 0.05);
  border: 1px solid rgba(0, 207, 255, 0.2);
  border-radius: 6px;
  padding: 10px 12px;
  margin-bottom: 12px;
  left:25px;
  top:50px;
}

.summary-row {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  font-size: 13px;

  &:last-child {
    margin-bottom: 0;
  }
}

.summary-label {
  color: rgba(255, 255, 255, 0.7);
}

.summary-value {
  color: #00cfff;
  font-weight: bold;
  margin: 0 4px;
}

.summary-detail {
  color: rgba(255, 255, 255, 0.6);
  font-size: 15px;
}

.charts-row {
  display: flex;
  position:absolute;
  top:450px;
  left:-150px;
  gap: 12px;
  margin-bottom: 12px;
}

.chart-item {
  flex: 1;
  background: rgba(0, 207, 255, 0.05);
  border: 1px solid rgba(0, 207, 255, 0.2);
  border-radius: 6px;
  padding: 8px;
}

.chart-title {
  color: #fff;
  font-size: 14px;
  text-align: center;
  margin-bottom: 6px;
}

.chart-box {
  width: 240px;
  height: 240px;
}

.table-section {
  position:absolute;
  top:200px;
  :deep(.el-table) {
    background: transparent;

    &::before {
      display: none;
    }
  }

  :deep(.el-table__inner-wrapper::before) {
    display: none;
  }

  :deep(.el-table tr) {
    background: transparent;
  }

  :deep(.el-table__body tr:hover > td) {
    background: rgba(0, 207, 255, 0.1) !important;
  }
}

.port-toggle {
  cursor: pointer;
  color: #00cfff;

  &:hover {
    text-decoration: underline;
  }
}

.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #fff;
}
</style>
