<template>
  <div class="flight-rate">
    <div class="panel-header">
      <span class="panel-title">航班正常率</span>
      <span class="panel-arrows">&lt;&lt;&lt;</span>
    </div>
    <div class="rate-tabs">
      <span v-for="(tab, i) in tabs" :key="i" class="rate-tab" :class="{ active: active === i }" @click="active = i">
        {{ tab }}
      </span>
    </div>
    <div class="rate-list">
      <div v-for="(item, i) in data" :key="i" class="rate-item">
        <span class="rate-label">
          <svg class="plane-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="currentColor"/>
          </svg>
          {{ item.name }}
        </span>
        <div class="rate-bar-wrap">
          <div class="rate-bar" :style="{ width: item.value + '%', background: item.color }">
            <span class="rate-value">{{ item.value }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tabs = ['放行正常率', '起飞正常率', '始发正常率']
const active = ref(0)

const data = [
  { name: '广州', value: 86, color: '#00cfff' },
  { name: '深圳', value: 99, color: '#00cfff' },
  { name: '珠海', value: 82, color: '#00cfff' }
]
</script>

<style lang="less" scoped>
.flight-rate {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.panel-header {
  padding: 4px 12px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  margin-bottom: 4px;
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
  letter-spacing: 2px;
}

.rate-tabs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.rate-tab {
  font-size: 12px;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  padding: 4px 10px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all 0.3s;
  &.active {
    color: #00cfff;
    border-color: #00cfff;
    background: rgba(0, 207, 255, 0.1);
  }
}

.rate-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap:20px;
}

.rate-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.rate-label {
  font-size: 12px;
  color: #8ec6f0;
  display: flex;
  align-items: center;
  gap: 4px;
}

.plane-icon {
  width: 14px;
  height: 14px;
  color: #00cfff;
}

.rate-bar-wrap {
  flex: 1;
  height: 18px;
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;
  position: relative;
}

.rate-bar {
  height: 100%;
  position: relative;
  transition: width 0.6s ease;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.rate-value {
  font-size: 12px;
  font-weight: bold;
  color: #000;
  padding-right: 4px;
  flex-shrink: 0;
}
</style>
