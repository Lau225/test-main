<template>
    <DxChart :data-source="chartData">
    <DxSeries argument-field="month" value-field="targetSpend" />
  </DxChart>
</template>

<script setup>
import DxChart, { DxSeries } from 'devextreme-vue/chart';
const chartData = [
  { month: 'January', targetSpend: 12000 },
  { month: 'February', targetSpend: 15500 },
  { month: 'March', targetSpend: 13500 },
  { month: 'April', targetSpend: 16000 },
  { month: 'May', targetSpend: 17000 },
  { month: 'June', targetSpend: 20000 },
  { month: 'July', targetSpend: 14500 },
  { month: 'August', targetSpend: 21000 },
  { month: 'September', targetSpend: 19000 },
  { month: 'October', targetSpend: 22000 },
  { month: 'November', targetSpend: 16000 },
  { month: 'December', targetSpend: 25000 },
];
</script>

<style lang="less" scoped>

</style>