<template>
  <div class="flow-table-container">
    <div class="panel-header">
      <span class="panel-arrows">>>></span>
      <span class="panel-title">空域容流状态</span>
    </div>
    <el-table :border="true" :data="transposedData" :header-cell-style="headerCellStyle" :cell-style="cellStyle" :show-header="false" class="flow-table" size="small">
      <el-table-column prop="metric" width="90" align="center"/>
      <el-table-column v-for="(_, index) in tableData" :key="index" align="center" width="50">
        <template #default="scope">
          <span v-if="scope.row.metric === '饱和率'" :style="{ color: getSaturationColor(scope.row.values[index]) }">
            {{ scope.row.values[index] }}%
          </span>
          <span v-else>{{ scope.row.values[index] }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 可配置的阈值
const thresholds = ref({
  good: 90,      // 绿色（良好）：> 90%
  warning: 80    // 黄色（需关注）：80% - 90%，红色（告警）：< 80%
})

// 当前时间段索引
const currentTimeIndex = ref(0)
const timeSlots = ['14:00至15:00', '15:00至16:00', '16:00至17:00']

const tableData = [
  { area: '扇区1', capacity: 74, flow: 45, saturation: 32, avgSaturation: '32%' },
  { area: '扇区2', capacity: 63, flow: 36, saturation: 54, avgSaturation: '32%' },
  { area: '扇区3', capacity: 46, flow: 92, saturation: 61, avgSaturation: '32%' },
  { area: '扇区4', capacity: 83, flow: 27, saturation: 74, avgSaturation: '32%' },
  { area: '走廊口1', capacity: 90, flow: 71, saturation: 85, avgSaturation: '32%' },
  { area: '走廊口2', capacity: 62, flow: 85, saturation: 69, avgSaturation: '32%' },
  { area: '走廊口3', capacity: 62, flow: 85, saturation: 92, avgSaturation: '32%' },
  { area: '走廊口4', capacity: 62, flow: 85, saturation: 69, avgSaturation: '32%' },
  { area: '航路1', capacity: 62, flow: 85, saturation: 69, avgSaturation: '32%' },
  { area: '航路2', capacity: 74, flow: 45, saturation: 32, avgSaturation: '32%' },
  { area: '航路3', capacity: 63, flow: 36, saturation: 54, avgSaturation: '32%' },
  { area: '航路4', capacity: 46, flow: 92, saturation: 61, avgSaturation: '32%' },
]

const transposedData = computed(() => [
  { metric: '空域单元', values: tableData.map(d => d.area) },
  { metric: '容量', values: tableData.map(d => d.capacity) },
  { metric: '流量', values: tableData.map(d => d.flow) },
  { metric: '饱和率', values: tableData.map(d => d.saturation) },
  { metric: '平均饱和率', values: tableData.map(d => d.avgSaturation) }
])

const getSaturationColor = (value) => {
  if (value > thresholds.value.good) return '#00ff88'  // 绿色
  if (value >= thresholds.value.warning) return '#ffcc00'  // 黄色
  return '#ff4444'  // 红色
}

const getTimeRange = (index) => {
  const midPoint = Math.floor(tableData.length / 2)
  return index < midPoint ? timeSlots[currentTimeIndex.value] : timeSlots[currentTimeIndex.value + 1]
}

const prevTime = () => {
  if (currentTimeIndex.value > 0) {
    currentTimeIndex.value--
  }
}

const nextTime = () => {
  if (currentTimeIndex.value < timeSlots.length - 2) {
    currentTimeIndex.value++
  }
}

const headerCellStyle = ({ columnIndex }) => ({
  background: '#0C2849',
  color: '#00cfff',
  fontSize: '12px',
  fontWeight: 'normal',
  borderBottom: '1px solid rgba(0, 207, 255, 0.2)',
  padding: '4px 2px',
  letterSpacing: '1px'
})

const cellStyle = ({ rowIndex, columnIndex }) => {
  const rowColors = {
    0: '#d0e8ff',  // 空域单元
    1: '#a8d5ff',  // 容量
    2: '#8bc9ff',  // 流量
    3: '#fff',     // 饱和率
    4: '#d0e8ff'   // 平均饱和率
  }
  const rowBackgrounds = {
    0: '#0C2849',  // 空域单元
    1: '#0F212B',  // 容量
    2: '#0F212B',  // 流量
    3: '#0F212B',  // 饱和率
    4: '#0C2849'   // 平均饱和率
  }
  return {
    background: columnIndex === 0 ? rowBackgrounds[rowIndex] : rowBackgrounds[rowIndex] || '#0F212B',
    color: rowColors[rowIndex] || '#d0e8ff',
    fontSize: '12px',
    borderBottom: '1px solid rgba(0, 207, 255, 0.1)',
    padding: '4px 0px'
  }
}
</script>

<style lang="less" scoped>
.flow-table-container {

  height: 100%;
  display: flex;
  flex-direction: column;
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

.time-column {
  line-height: 1.2;
  font-size: 12px;
  font-weight: bold;
}

.time-arrow {
  color: #00cfff;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  transition: color 0.3s;
}

.time-arrow:hover {
  color: #00ffff;
}

.time-text {
  font-size: 11px;
  color: #00cfff;
  line-height: 1.2;
  white-space: nowrap;
}

.time-display {
  font-size: 11px;
  color: #00cfff;
  line-height: 1.3;
  letter-spacing: 1px;
}

:deep(.flow-table) {
  background: transparent;
  --el-table-bg-color: transparent;
  --el-table-tr-bg-color: transparent;
  --el-table-header-bg-color: transparent;
  --el-table-border-color: rgba(0, 207, 255, 0.1);
  --el-table-row-hover-bg-color: rgba(0, 207, 255, 0.08);

  &::before,
  &::after {
    display: none;
  }

  .el-table__inner-wrapper::before {
    display: none;
  }

  th.el-table__cell {
    background: #0C2849 !important;
  }

  tr {
    background: transparent !important;
  }

  td.el-table__cell {
    border-bottom: 1px solid rgba(0, 207, 255, 0.1);
  }

  .el-table__body-wrapper {
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
