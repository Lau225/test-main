<template>
  <span 
    :class="tagClasses" 
    :style="{ cursor: cursor }"
    @click="handleClick"
  >
    <span 
      v-if="type === 'primary'" 
      class="custom-tag__indicator"
    ></span>
    <slot></slot>
    <span 
      v-if="closable" 
      class="custom-tag__close"
      @click.stop="handleClose"
    >
      ×
    </span>
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'success', 'info', 'warning', 'danger'].includes(value)
  },
  size: {
    type: String,
    default: 'default',
    validator: (value) => ['large', 'default', 'small'].includes(value)
  },
  closable: {
    type: Boolean,
    default: false
  },
  cursor: {
    type: String,
    default: 'default'
  }
})

const emit = defineEmits(['click', 'close'])

const tagClasses = computed(() => {
  return [
    'custom-tag',
    `custom-tag--${props.type}`,
    `custom-tag--${props.size}`,
    {
      'custom-tag--closable': props.closable
    }
  ]
})

const handleClick = (event) => {
  emit('click', event)
}

const handleClose = (event) => {
  emit('close', event)
}
</script>

<style scoped>
.custom-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 400;
  line-height: 1;
  transition: none;
  user-select: none;
  vertical-align: middle;
  height: 32px;
  color: rgba(255, 255, 255, 0.85);
  border-radius: 6px;
}

/* 尺寸样式 */
.custom-tag--large {
  height: 32px;
  padding: 0 12px;
  font-size: 14px;
}

.custom-tag--default {
  height: 100%;
  padding: 0 15px;
  font-size: 14px;
}

.custom-tag--small {
  height: 20px;
  padding: 0 5px;
  font-size: 11px;
}

/* 类型样式 - Primary */
.custom-tag--primary {
  color: #ffffff;
  background-color: #3d3d3d;
  border-color: transparent;
  box-shadow: none;
}



/* 类型样式 - Success */
.custom-tag--success {
  color: #ffffff;
  background-color: #67c23a;
  border-color: #67c23a;
}

.custom-tag--success:hover {
  background-color: #85ce61;
  border-color: #85ce61;
}

/* 类型样式 - Info */
.custom-tag--info {
  color: rgba(255, 255, 255, 0.65);
  background-color: transparent;
  border-color: transparent;
}

.custom-tag--info:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

/* 类型样式 - Warning */
.custom-tag--warning {
  color: #ffffff;
  background-color: #e6a23c;
  border-color: #e6a23c;
}

.custom-tag--warning:hover {
  background-color: #ebb563;
  border-color: #ebb563;
}

/* 类型样式 - Danger */
.custom-tag--danger {
  color: #ffffff;
  background-color: #f56c6c;
  border-color: #f56c6c;
}

.custom-tag--danger:hover {
  background-color: #f78989;
  border-color: #f78989;
}

/* 激活指示器样式 */
.custom-tag__indicator {
  display: none;
}

/* 关闭按钮样式 */
.custom-tag__close {
  margin-left: 8px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  font-weight: bold;
  line-height: 1;
  color: inherit;
}

.custom-tag__close:hover {
  background-color: rgba(37, 99, 235, 0.15);
}

.custom-tag--info .custom-tag__close {
  color: rgba(255, 255, 255, 0.45);
}

.custom-tag--info .custom-tag__close:hover {
  background-color: transparent;
  color: #ffffff;
}

/* 可关闭标签的额外样式 */
.custom-tag--closable {
  padding-right: 8px;
}

.custom-tag--large.custom-tag--closable {
  padding-right: 12px;
}

.custom-tag--small.custom-tag--closable {
  padding-right: 4px;
}

.custom-tag--small .custom-tag__close {
  width: 12px;
  height: 12px;
  font-size: 10px;
  margin-left: 4px;
}

.custom-tag--large .custom-tag__close {
  width: 18px;
  height: 18px;
  font-size: 16px;
  margin-left: 8px;
}

/* 焦点样式 */
.custom-tag:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

/* 激活状态样式 */
.custom-tag:active {
  transform: none;
}
</style>
