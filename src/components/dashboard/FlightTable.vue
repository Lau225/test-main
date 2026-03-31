<template>
  <div class="flight-table">
    <div class="panel-header">
      <span class="panel-title">航班数量</span>
      <span class="panel-arrows">&lt;&lt;&lt;</span>
    </div>
    <el-table :data="tableData" :header-cell-style="headerCellStyle" :cell-style="cellStyle"
      :row-style="rowStyle" size="small">
      <el-table-column width="70" prop="name" label="名称" align="center" />
      <el-table-column width="70" prop="total" label="总量" align="center" />
      <el-table-column width="70" prop="executed" label="已执行" align="center" />
      <el-table-column width="70" prop="unexecuted" label="未执行" align="center" />
      <el-table-column width="70" prop="timeAdjust" label="调时" align="center" />
      <el-table-column width="70" prop="reduce" label="调减" align="center" />
    </el-table>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const tableData = reactive([
  { name: '广州', total: 506, executed: 404, unexecuted: 102, timeAdjust: 8, reduce: 3 },
  { name: '深圳', total: 380, executed: 300, unexecuted: 80, timeAdjust: 5, reduce: 2 },
  { name: '珠海', total: 120, executed: 100, unexecuted: 20, timeAdjust: 2, reduce: 1 }
])

const headerCellStyle = {
  background: 'linear-gradient(180deg, rgba(0, 207, 255, 0.25) 0%, rgba(0, 207, 255, 0.08) 100%)',
  color: '#00cfff',
  fontSize: '13px',
  fontWeight: 'normal',
  borderBottom: '1px solid rgba(0, 207, 255, 0.2)',
  padding: '8px 0',
  letterSpacing: '1px'
}

const cellStyle = {
  background: 'transparent',
  color: '#d0e8ff',
  fontSize: '13px',
  borderBottom: '1px solid rgba(0, 207, 255, 0.1)',
  padding: '8px 0'
}

const rowStyle = {
  background: 'transparent'
}
</script>

<style lang="less" scoped>
.flight-table {
  height: 100%;
  display: flex;
  flex-direction: column;

  .panel-header {
    padding: 4px 12px;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 6px;
    background: linear-gradient(90deg, transparent 0%, rgba(0, 207, 255, 0.25) 100%);
    border-bottom: 1px solid rgba(0, 207, 255, 0.3);
  }

  .panel-arrows {
    color: #00cfff;
    font-size: 12px;
    letter-spacing: -1px;
  }

  .panel-title {
    color: #fff;
    font-size: 14px;
    letter-spacing: 0px;
  }

  :deep(.el-table) {
    background: transparent;
    --el-table-bg-color: transparent;
    --el-table-tr-bg-color: transparent;
    --el-table-header-bg-color: transparent;
    --el-table-border-color: rgba(0, 207, 255, 0.1);
    --el-table-row-hover-bg-color: rgba(0, 207, 255, 0.08);
    --el-table-text-color: #d0e8ff;
    --el-table-header-text-color: #00cfff;

    &::before,
    &::after {
      display: none;
    }

    .el-table__inner-wrapper::before {
      display: none;
    }

    th.el-table__cell {
      background: linear-gradient(180deg, rgba(0, 207, 255, 0.25) 0%, rgba(0, 207, 255, 0.08) 100%) !important;
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

    .el-table__empty-block {
      background: transparent;
    }
  }
}
</style>
