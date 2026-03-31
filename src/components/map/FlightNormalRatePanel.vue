<template>
  <div class="panel-header">
    <span class="panel-arrows">>>></span>
    <span class="panel-title">核心运行指标</span>
  </div>
  <div class="rate-panel">
    <div class="rate-grid">
      <div
        v-for="(item, index) in rateData"
        :key="index"
        class="rate-card"
      >
        <div class="rate-card-title">{{ item.label }}</div>
        <div class="rate-card-body">
          <div class="rate-col">
            <div class="rate-sub-label">当前(%)</div>
            <div class="rate-value" :class="getColorClass(item.current)">{{ item.current.toFixed(2) }}</div>
          </div>
          <div class="rate-col">
            <div class="rate-sub-label">本月累计(%)</div>
            <div class="rate-value" :class="getColorClass(item.monthly)">{{ item.monthly.toFixed(2) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const rateData = ref([
  { label: '始发正常率', current: 75.50, monthly: 90.80 },
  { label: '起飞正常率', current: 80.20, monthly: 75.70 },
  { label: '放行正常率', current: 99.10, monthly: 98.30 }
])

const getColorClass = (value) => {
  if (value >= 90) return 'green'
  if (value >= 80) return 'yellow'
  return 'red'
}
</script>

<style lang="less" scoped>
.rate-panel {
  padding: 0px;
  background: transparent;
}

.rate-grid {
  display: flex;
  gap: 10px;
}

.rate-card {
  flex: 1;
  padding: 8px 12px;
  background: rgba(0, 20, 40, 0.8);
  border: 1px solid rgba(200, 160, 50, 0.6);
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(200, 160, 50, 0.3);
  }
}

.rate-card-title {
  font-size: 15px;
  color: #fff;
  text-align: center;
  margin-bottom: 4px;
  font-weight: bold;
  letter-spacing: 1px;
}

.rate-card-body {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}

.rate-col {
  flex: 1;
  text-align: center;
}

.rate-sub-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 2px;
}

.rate-value {
  font-size: 22px;
  font-weight: bold;
  font-family: 'Arial', sans-serif;
  letter-spacing: 1px;
}

.rate-value.green {
  color: #00ff88;
}

.rate-value.yellow {
  color: #ffcc00;
}

.rate-value.red {
  color: #ff4444;
}

.panel-header {
  padding: 4px 12px;
  margin-bottom: 6px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
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
  letter-spacing: 0px;
}
</style>
