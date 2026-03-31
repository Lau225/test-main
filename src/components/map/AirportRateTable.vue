<template>
  <div class="airport-rate-table-panel">
    <el-table :data="tableData" border style="width: 100%" :header-cell-style="headerCellStyle" :cell-style="cellStyle">
      <el-table-column prop="type" label="" width="100" />
      <el-table-column prop="bjCapital" label="北京首都" width="50" />
      <el-table-column prop="bjDaxing" label="北京大兴" width="50" />
      <el-table-column prop="shHongqiao" label="上海虹桥" width="50" />
      <el-table-column prop="shPudong" label="上海浦东" width="50" />
      <el-table-column prop="hzXiaoshan" label="杭州萧山" width="50" />
      <el-table-column prop="cdShuangliu" label="成都双流" width="50" />
      <el-table-column prop="cdTianfu" label="成都天府" width="50" />
      <el-table-column prop="cqJiangbei" label="重庆江北" width="50" />
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tableData = ref([
  { type: '去程正常率', bjCapital: '85%', bjDaxing: '88%', shHongqiao: '82%', shPudong: '86%', hzXiaoshan: '90%', cdShuangliu: '83%', cdTianfu: '87%', cqJiangbei: '84%' },
  { type: '返程正常率', bjCapital: '80%', bjDaxing: '83%', shHongqiao: '78%', shPudong: '81%', hzXiaoshan: '85%', cdShuangliu: '79%', cdTianfu: '82%', cqJiangbei: '80%' },
  { type: '差值', bjCapital: '5%', bjDaxing: '5%', shHongqiao: '4%', shPudong: '5%', hzXiaoshan: '5%', cdShuangliu: '4%', cdTianfu: '5%', cqJiangbei: '4%' }
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
.airport-rate-table-panel {
  width: 100%;
  height: 100%;
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
