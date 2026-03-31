<template>
    <el-table
        v-loading="loading"
        :data="data"
        :default-sort="defaultSort"
        border
        style="width: 100%"
        class="dx-style-table"
        v-bind="$attrs"
        @sort-change="handleSortChange">
        <slot></slot>
    </el-table>
</template>

<script>
export default {
    name: 'DxTable',
    inheritAttrs: false
}
</script>

<script setup>
defineProps({
    data: {
        type: Array,
        default: () => []
    },
    loading: {
        type: Boolean,
        default: false
    },
    defaultSort: {
        type: Object,
        default: () => ({})
    }
})

const emit = defineEmits(['sort-change'])

const handleSortChange = (sortInfo) => {
    emit('sort-change', sortInfo)
}
</script>

<style lang="less" scoped>
/* DevExtreme 风格的表格样式 */
.dx-style-table {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

    :deep(.el-table__header-wrapper) {
        background-color: #f8f9fa;

        th {
            background-color: #f8f9fa !important;
            font-weight: 600;
            color: #333;
        }
    }

    :deep(.el-table__body-wrapper) {
        .el-table__row:hover > td {
            background-color: #f5f5f5 !important;
        }
    }

    :deep(.el-table__cell) {
        padding: 12px;
        height: 48px;
    }
}

/* 暗色模式适配 */
html.dark .dx-style-table {
    :deep(.el-table__header-wrapper) {
        background-color: #1a1a1a;

        th {
            background-color: #1a1a1a !important;
            color: #e5e5e5;
            border-color: #3a3a3a;
        }
    }

    :deep(.el-table__body-wrapper) {
        .el-table__row:hover > td {
            background-color: #2a2a2a !important;
        }
    }
}
</style>
