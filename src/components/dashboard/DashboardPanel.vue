<template>
  <div class="dashboard-panel">

    <div class="panel-header">
      <span class="panel-arrows">&gt;&gt;&gt;</span>
      <span class="panel-title">{{ title }}</span>
    </div>
    <div class="panel-body">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: '' }
})
</script>

<style lang="less" scoped>
.dashboard-panel {
  position: relative;
  background: rgba(0, 20, 50, 0.6);
  border: 1px solid rgba(0, 207, 255, 0.4);
  box-shadow: 0 0 15px rgba(0, 207, 255, 0.25), 0 0 30px rgba(0, 207, 255, 0.1), inset 0 0 20px rgba(0, 207, 255, 0.15), inset 0 0 40px rgba(0, 207, 255, 0.05);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.panel-corner {
  position: absolute;
  width: 10px;
  height: 10px;
  z-index: 1;

  &.tl {
    top: -1px; left: -1px;
    border-top: 2px solid #00cfff;
    border-left: 2px solid #00cfff;
    box-shadow: -2px -2px 6px rgba(0, 207, 255, 0.5);
  }
  &.tr {
    top: -1px; right: -1px;
    border-top: 2px solid #00cfff;
    border-right: 2px solid #00cfff;
    box-shadow: 2px -2px 6px rgba(0, 207, 255, 0.5);
  }
  &.bl {
    bottom: -1px; left: -1px;
    border-bottom: 2px solid #00cfff;
    border-left: 2px solid #00cfff;
    box-shadow: -2px 2px 6px rgba(0, 207, 255, 0.5);
  }
  &.br {
    bottom: -1px; right: -1px;
    border-bottom: 2px solid #00cfff;
    border-right: 2px solid #00cfff;
    box-shadow: 2px 2px 6px rgba(0, 207, 255, 0.5);
  }
}

.panel-header {
  padding: 8px 12px;
  border-bottom: 1px solid rgba(0, 207, 255, 0.15);
  display: flex;
  align-items: center;
  gap: 6px;
}

.panel-arrows {
  color: #00cfff;
  font-size: 12px;
  letter-spacing: -1px;
}

.panel-title {
  color: #BADFFC;
  font-size: 14px;
  letter-spacing: 0px;
}

.panel-body {
  flex: 1;
  padding: 8px;
  overflow: hidden;
}
</style>
