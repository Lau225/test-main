<template>
  <div class="airline-table-panel">
    <el-table border :data="tableData" style="width: 100%" :header-cell-style="headerCellStyle" :cell-style="cellStyle">
      <el-table-column prop="airline" label="航司" width="50" />
      <el-table-column label="计划/已执行/未执行" width="140">
        <template #default="scope">
          {{ scope.row.plan }}/{{ scope.row.executed }}/{{ scope.row.unexecuted }}
        </template>
      </el-table-column>
      <el-table-column prop="takeoffRate" label="起飞率" width="70" />
      <el-table-column label="已延误/累计延误" width="120">
        <template #default="scope">
          {{ scope.row.delayed }}/{{ scope.row.totalDelayed }}
        </template>
      </el-table-column>
      <el-table-column prop="onboardDelay" label="机上延误" width="80"/>
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tableData = ref([
  { airline: '东航', plan: 45, executed: 40, unexecuted: 5, takeoffRate: '88%', delayed: 3, totalDelayed: 120, onboardDelay: 45 },
  { airline: '南航', plan: 38, executed: 35, unexecuted: 3, takeoffRate: '92%', delayed: 2, totalDelayed: 85, onboardDelay: 30 },
  { airline: '国航', plan: 42, executed: 38, unexecuted: 4, takeoffRate: '90%', delayed: 4, totalDelayed: 150, onboardDelay: 55 },
  
])

const headerCellStyle = {
  background: 'rgba(0, 100, 150, 0.3)',
  color: '#00cfff',
  fontSize: '12px',
  borderColor: 'rgba(0, 207, 255, 0.2)'
}

const cellStyle = {
  background: 'rgba(0, 20, 40, 0.6)',
  color: '#fff',
  fontSize: '12px',
  borderColor: 'rgba(0, 207, 255, 0.1)'
}
</script>

<style lang="less" scoped>
.airline-table-panel {
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
  font-size: 16px;
}

:deep(.el-table) {
  background: transparent;
}

:deep(.el-table__body tr) {
  background: transparent;
}

:deep(.el-table__body tr:hover > td) {
  background: rgba(0, 207, 255, 0.1) !important;
}
</style>
