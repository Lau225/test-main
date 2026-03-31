<template>
    <div v-loading="loading" ref="chartRef" class="echarts-container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
    options: {
        type: Object,
        required: true
    },
    loading: Boolean
})

const chartRef = ref(null)
let chartInstance = null

onMounted(() => {
    if (chartRef.value) {
        // 初始化 ECharts 实例，明确使用亮色主题
        chartInstance = echarts.init(chartRef.value, 'dark')

        // 设置配置项
        if (props.options) {
            chartInstance.setOption(props.options)
        }

        // 监听窗口大小变化
        window.addEventListener('resize', handleResize)
    }
})

onUnmounted(() => {
    // 清理
    window.removeEventListener('resize', handleResize)
    if (chartInstance) {
        chartInstance.dispose()
        chartInstance = null
    }
})

// 监听 options 变化
watch(() => props.options, (newOptions) => {
    if (chartInstance && newOptions) {
        chartInstance.setOption(newOptions)
    }
}, { deep: true })

// 处理窗口大小变化
const handleResize = () => {
    if (chartInstance) {
        chartInstance.resize()
    }
}
</script>

<style lang="less" scoped>
.echarts-container {
    flex: 1;
    min-height: 0px;
    width: 100%;
    border-radius: 4px;
    clip-path: inset(1px);
}
</style>