<template>
  <v-scale-screen :width="1920" :height="1200" :full-screen="true">
    <div class="dashboard" id="dashboard">
      <div class="dashboard-content">
        <!-- 核心运行指标 -->
        <div class="rate-panel-box">
          <FlightNormalRatePanel />
        </div>
        <!-- 区域流量分布 -->
        <div class="mixed-chart-box">
          <MixedChart />
        </div>
        <!-- 积压航班 -->
        <div class="backlog-panel-box">
          <BacklogFlightPanel />
        </div>
        <!-- 航班情况 -->
        <div class="corridor-chart-box">
          <CorridorFlowChart />
        </div>
        <!-- 航班执行情况 -->
        <div class="flight-execution-box">
          <FlightExecutionPanel />
        </div>
        <!-- 两个图表 -->
        <div class="bottom-table-left">
          <AirlineTable />
        </div>

        <div class="bottom-table-right">
          <AirportRateTable />
        </div>

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
            <iframe class="ellipse-iframe" src="http://localhost:3002/map" frameborder="0"></iframe>
            <gzMap></gzMap>
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
    </div>
  </v-scale-screen>
</template>
<script setup>
import { ref } from 'vue'
import VScaleScreen from 'v-scale-screen'
import FlightNormalRatePanel from '@/components/map/FlightNormalRatePanel.vue'
import CorridorFlowChart from '@/components/map/CorridorFlowChart.vue'
import BacklogFlightPanel from '@/components/map/BacklogFlightPanel.vue'
import MixedChart from '@/components/map/MixedChart.vue'
import FlightExecutionPanel from '@/components/map/FlightExecutionPanel.vue'
import AirlineTable from '@/components/map/AirlineTable.vue'
import AirportRateTable from '@/components/map/AirportRateTable.vue'
const tabs = ['首页', '空中态势' ,'广州白云', '深圳宝安', '珠海金湾']
const activeTab = ref(2)
</script>

<style lang="less" scoped>
.mixed-chart-box {
  position: absolute;
  left: 0px;
  top: 300px;
  width: 360px;
  height: 320px;
  z-index: 10;
}

.backlog-panel-box {
  position: absolute;
  right: -10px;
  top: 350px;
  width: 390px;
  height: 600px;
  z-index: 10;
}

.corridor-chart-box {
  position: absolute;
  right: -30px;
  top:0px;
  width: 460px;
  height: 280px;
  z-index: 10;
}

.flight-execution-box {
  position: absolute;
  left: 0px;
  top: 610px;
  width: 380px;
  height: 480px;
  z-index: 10;
}

.bottom-table-left {
  position: absolute;
  left: 400px;
  top: 890px;
  height: 200px;
  z-index: 10;
}

.bottom-table-right {
  position: absolute;
  left: 880px;
  top: 880px;
  height: 200px;
  z-index: 10;
}

.rate-panel-box {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 520px;
  z-index: 10;
}

.left-table-box {
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 10;
}

.right-chart-box {
  position: absolute;
  right: 0px;
  top: 0px;
  width: 360px;
  height: 250px;
  z-index: 10;
}

.dashboard {
  width: 1920px;
  height: 1200px;
  background: #0a0e27;
  overflow: hidden;
  position: relative;
}

.dashboard::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1200px;
  height: 1920px;
  background-image: url('@/assets/picture/bigDataBg.png');
  background-size: cover;
  background-position: center;
  transform: translate(-50%, -50%) rotate(270deg);
  z-index: 0;
  opacity: 0.5;
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
  top: 0px;
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
  right: 40px;
  top: 570px;
  width: 350px;
  height: 310px;
}

.bottom-pannel {
  width: 100%;
  position: absolute;
  top: 870px;
  display: flex;
  justify-content: space-around;
  gap: 20px;
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

.bottom-pannel {
  width: 100%;
  position: absolute;
  top: 870px;
  display: flex;
  justify-content: space-around;
  gap: 10px;
}

.bottom-left-panel1 {
  height: 220px;
  flex:1;
}
.bottom-left-panel2 {
  height: 220px;
  flex: 1.3;
}
</style>