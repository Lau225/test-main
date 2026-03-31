<template>
    <div>
        <DxDrawer v-model:opened="isOpen" :min-size="37" :height="250" template="list">
            <template #list>
                <div style="width: 150px;background-color: red;">Drawer content</div>
            </template>
            <div id="view">
                <div style="background-color: aqua;">View content</div>
            </div>
        </DxDrawer>
    </div>
</template>

<script setup>
import { DxDrawer } from 'devextreme-vue/drawer';
const props = defineProps({
    open:{
        type: Boolean,
        default: false
    }
})
const isOpen = computed(() => props.open)
console.log(isOpen.value);

</script>

<style scoped>
.dx-overlay-content {
    background-color: lightgray;
}
</style>