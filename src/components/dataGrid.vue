<template>
    <div>
        <DxDataGrid @selection-changed="onSelectionChanged" :selected-row-keys="selectedRowKeys"
            :data-source="customers" :key-expr="'ID'" :width="'100%'" :show-borders="true">
            <DxSelection v-if="isSelection" mode="multiple" />
            <DxColumn v-for="column in columns" :cell-template="column.cellTemplate" :data-field="column.dataField"
                :caption="column.caption" :alignment="column.alignment" :group-index="column.group" />

            <template v-for="slot in slots" #[slot]>
                <slot :name="slot" :data="customers" />
            </template>

            <DxPaging :page-size="10" />
        </DxDataGrid>

    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useSlots } from 'vue';
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxSelection,
} from 'devextreme-vue/data-grid';
const props = defineProps({
    columns: Array,
    isSelection: {
        type: Boolean,
        default: false
    }
})
const slots = Object.keys(useSlots())
const selectedRowKeys = ref([])
const emit = defineEmits(['selection-changed'])
const onSelectionChanged = (e) => {
    selectedRowKeys.value = e.selectedRowKeys
    emit('selection-changed', selectedRowKeys.value)
}
const customers = ref([
    {
        ID: 1,
        CompanyName: 'Premier Buy',
        City: 'Richfield',
        State: 'vue2应用',
        Phone: '(612) 291-1000',
        Fax: '(612) 291-2001',
    },
    {
        ID: 2,
        CompanyName: 'ElectrixMax',
        City: 'Naperville',
        State: 'vue3应用',
        Phone: '(630) 438-7800',
        Fax: '(630) 438-7801',
    }
])

</script>
<style scoped>
.options {
    padding: 20px;
    margin-top: 20px;
    background-color: rgba(191, 191, 191, 0.15);
}

.caption {
    font-size: 18px;
    font-weight: 500;
}

.option {
    margin-top: 10px;
}

/* 操作按钮样式 */
.action-buttons {
    display: flex;
    gap: 8px;
}
</style>