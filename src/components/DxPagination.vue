<template>
    <div class="dx-pagination">
        <span class="pagination-info">第 {{ currentPage }} 页，共 {{ totalPages }} 页 (共 {{ total }} 条)</span>
        <el-pagination
            v-model:current-page="currentPageModel"
            v-model:page-size="pageSizeModel"
            :page-sizes="pageSizes"
            :total="total"
            layout="sizes, prev, pager, next"
            :hide-on-single-page="false"
        />
    </div>
</template>

<script>
export default {
    name: 'DxPagination'
}
</script>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    currentPage: {
        type: Number,
        default: 1
    },
    pageSize: {
        type: Number,
        default: 10
    },
    total: {
        type: Number,
        default: 0
    },
    pageSizes: {
        type: Array,
        default: () => [5, 10, 20]
    }
})

const emit = defineEmits(['update:currentPage', 'update:pageSize'])

const currentPageModel = computed({
    get: () => props.currentPage,
    set: (val) => emit('update:currentPage', val)
})

const pageSizeModel = computed({
    get: () => props.pageSize,
    set: (val) => emit('update:pageSize', val)
})

const totalPages = computed(() => Math.ceil(props.total / props.pageSize))
</script>

<style lang="less" scoped>
/* DevExtreme 风格的分页 */
.dx-pagination {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;

    .pagination-info {
        font-size: 13px;
        color: #666;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
}
</style>
