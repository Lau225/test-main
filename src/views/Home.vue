<template>
  <v-scale-screen :width="1920" :height="1200" :full-screen="true">
  <div class="dashboard" id="dashboard">
    <div class="dashboard-content">
      <div class="ellipse-container">
        <svg class="ellipse-border" viewBox="0 0 1400 1000" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="ellipseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#00cfff" stop-opacity="0.05" />
              <stop offset="45%" stop-color="#00cfff" stop-opacity="1" />
              <stop offset="55%" stop-color="#00cfff" stop-opacity="1" />
              <stop offset="100%" stop-color="#00cfff" stop-opacity="0.05" />
            </linearGradient>
          </defs>
          <ellipse cx="700" cy="500" rx="599" ry="499" fill="none" stroke="url(#ellipseGrad)" stroke-width="2" />
        </svg>
        <!-- 椭圆内容区（超出椭圆裁剪） -->
        <div class="ellipse-content">
          <img src="@/assets/picture/bigMap.png" class="ellipse-iframe" alt="地图" />
        </div>
        <!-- 标签下方装饰弧线 -->
        <svg class="nav-curve-line" viewBox="0 0 1400 55" xmlns="http://www.w3.org/2000/svg">
          <path d="M 386,0 C 402,0 469,50 571,50 L 829,50 C 931,50 998,0 1014,0" stroke="rgba(0,207,255,0.45)"
            fill="none" stroke-width="3" />
        </svg>
        <!-- 标签导航（椭圆内部） -->
        <div class="nav-tabs">
          <div v-for="(tab, index) in tabs" :key="index" class="nav-tab" :class="{ active: activeTab === index }"
            @click="activeTab = index">
            {{ tab }}
          </div>
        </div>
      </div>
    </div>
    <!-- 航班正常率 -->
    <FlightRate class="flight-rate-box" />
    <!-- 航班数量 -->
    <FlightTable class="flight-table-box" />
    <!-- 积压航班饼图 -->
    <BacklogPieChart class="backlog-pie-box1" />
    <BacklogPieChart class="backlog-pie-box2" />
    <BacklogPieChart class="backlog-pie-box3" />
    <!-- 3D 柱状图 -->
    <BarChart3D class="bar-chart-box" />
    <!-- 左下角面板 -->
    <div class="bottom-pannel">
      <DashboardPanel title="起飞延误" class="bottom-left-panel1">
        <DelayBarChart />
      </DashboardPanel>
      <DashboardPanel title="机上延误" class="bottom-left-panel2">
        <DelayBarChart />
      </DashboardPanel>
      <DashboardPanel title="累积延误" class="bottom-left-panel3">
        <CumulativeDelay />
      </DashboardPanel>
    </div>
  </div>
  </v-scale-screen>
</template>
<script setup>
import { ref } from 'vue'
import VScaleScreen from 'v-scale-screen'
import BarChart3D from '@/components/dashboard/BarChart3D.vue'
import DashboardPanel from '@/components/dashboard/DashboardPanel.vue'
import DelayBarChart from '@/components/dashboard/DelayBarChart.vue'
import FlightRate from '@/components/dashboard/FlightRate.vue'
import CumulativeDelay from '@/components/dashboard/CumulativeDelay.vue'
import FlightTable from '@/components/dashboard/FlightTable.vue'
import BacklogPieChart from '@/components/dashboard/BacklogPieChart.vue'

const tabs = ['首页', '空中态势','广州白云', '深圳宝安', '珠海金湾']
const activeTab = ref(0)


</script>

<style lang="less" scoped>
.dashboard {
  width: 1920px;
  height: 1200px;
  background: #0a0e27;
  overflow: hidden;
  position: relative;
}

.dashboard-content {
  width: 1920px;
  height: 100%;
  margin: 0 auto;
  position: relative;
}

/* 顶部导航（椭圆内部） */
.nav-tabs {
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 15px;
  z-index: 2;
}

.ellipse-container {
  width: 1400px;
  height: 850px;
  position: absolute;
  top: -3%;
  left: 47%;
  transform: translateX(-50%);
  overflow: hidden;
  scale: 0.91;
}

.nav-tab {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  padding: 8px 4px;
  position: relative;
  letter-spacing: 0px;
  transition: color 0.3s;
}

.nav-tab:hover {
  color: rgba(255, 255, 255, 0.8);
}

.nav-tab.active {
  color: #00cfff;
}



/* 标签下方弧形装饰线 */
.nav-arc-wrapper {
  position: absolute;
  top: 45px;
  left: 50%;
  transform: translateX(-50%);
  width: 1100px;
  height: 30px;
  overflow: hidden;
  z-index: 1;
}

.nav-arc {
  width: 1100px;
  height: 800px;
  border: 1px solid rgba(0, 207, 255, 0.5);
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.nav-curve-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 55px;
  z-index: 1;
  pointer-events: none;
}

.ellipse-border {
  width: 1400px;
  height: 1000px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  pointer-events: none;
}

.ellipse-content {
  width: 1400px;
  height: 1000px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  clip-path: path('M 386,75 C 402,75 469,125 571,125 L 829,125 C 931,125 998,75 1014,75 A 599 499 0 1 1 386,75 Z');
  box-sizing: border-box;
}
.ellipse-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.bar-chart-box {
  position: absolute;
  left: 30px;
  top: 580px;
  width: 400px;
  height: 250px;
}
.flight-rate-box {
  position: absolute;
  left: 12px;
  top: 280px;
  width: 350px;
  height: 280px;
}
.flight-table-box {
  position: absolute;
  left: 10px;
  top: 20px;
  width: 400px;
  height: 220px;
}
.backlog-pie-box1 {
  position: absolute;
  right: 70px;
  width: 350px;
  top:0px;
  height: 310px;
}
.backlog-pie-box2 {
  position: absolute;
  right: 60px;
  top: 300px;
  width: 310px;
  height: 310px;
}
.backlog-pie-box3 {
  position: absolute;
  right:40px;
  top: 570px;
  width: 350px;
  height: 310px;
}
.bottom-pannel{
  width:100%;
  position: absolute;
  top: 870px;
  display: flex;
  justify-content:space-around;
  gap:20px;
}
.bottom-left-panel1 {
  width: 700px;
  height: 220px;
}

.bottom-left-panel2 {
  width: 700px;
  height: 220px;
}

.bottom-left-panel3 {
  width: 800px;
  height: 220px;
}
</style>