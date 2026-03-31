<template>
  <div class="tech-border-wrapper" :style="{ width, height }">
    <!-- 标题区域 -->
    <div class="tech-border-header" v-if="title">
      <div class="header-left">
        <div class="header-arrows">
          <span class="arrow"></span>
          <span class="arrow"></span>
          <span class="arrow"></span>
        </div>
        <span class="header-title">{{ title }}</span>
      </div>
      <div class="header-right">
        <slot name="extra"></slot>
      </div>
    </div>

    <!-- 内容区域（带边框） -->
    <div class="tech-border-content">
      <!-- 四个角的装饰 -->
      <div class="corner corner-bottom-left"></div>
      <div class="corner corner-bottom-right"></div>

      <div class="content-inner">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: 'auto'
  },
  height: {
    type: String,
    default: 'auto'
  }
})
</script>

<style scoped>
.tech-border-wrapper {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

/* 标题区域 */
.tech-border-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: linear-gradient(90deg, #27526a 0%, rgba(85, 176, 225, 0.3) 20%, rgba(85, 176, 225, 0.1) 100%);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-right {
  color: #BADFFC;
  font-size: 16px;
}

.header-arrows {
  display: flex;
  align-items: center;
  gap: 2px;
}

.arrow {
  display: inline-block;
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-left: 10px solid #BADFFC;
  ;
}

.header-title {
  font-size: 20px;
  font-weight: 600;
  color: #BADFFC;
  letter-spacing: 2px;
}

/* 内容区域 */
.tech-border-content {
  position: relative;
  flex: 1;
  background: #0F212B;
  border: 1px solid #55B0E1;
  box-sizing: border-box;
}

.content-inner {
  padding: 16px;
  color: #e0e0e0;
}

/* 角落装饰 */
.corner {
  position: absolute;
  width: 16px;
  height: 16px;
  z-index: 1;
}

.corner::before,
.corner::after {
  content: '';
  position: absolute;
  background: #55B0E1;
}

.corner-top-left {
  top: -1px;
  left: -1px;
}

.corner-top-left::before {
  width: 16px;
  height: 3px;
  top: 0;
  left: 0;
}

.corner-top-left::after {
  width: 3px;
  height: 16px;
  top: 0;
  left: 0;
}

.corner-top-right {
  top: -1px;
  right: -1px;
}

.corner-top-right::before {
  width: 16px;
  height: 3px;
  top: 0;
  right: 0;
}

.corner-top-right::after {
  width: 3px;
  height: 16px;
  top: 0;
  right: 0;
}

.corner-bottom-left {
  bottom: -1px;
  left: -1px;
}

.corner-bottom-left::before {
  width: 16px;
  height: 3px;
  bottom: 0;
  left: 0;
}

.corner-bottom-left::after {
  width: 3px;
  height: 16px;
  bottom: 0;
  left: 0;
}

.corner-bottom-right {
  bottom: -1px;
  right: -1px;
}

.corner-bottom-right::before {
  width: 16px;
  height: 3px;
  bottom: 0;
  right: 0;
}

.corner-bottom-right::after {
  width: 3px;
  height: 16px;
  bottom: 0;
  right: 0;
}
</style>
