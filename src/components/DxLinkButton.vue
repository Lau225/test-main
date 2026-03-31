<template>
    <el-button link type="primary" class="dx-link-button" v-bind="$attrs">
        <slot></slot>
    </el-button>
</template>

<script>
export default {
    name: 'DxLinkButton',
    inheritAttrs: false
}
</script>

<style lang="less" scoped>
/* DevExtreme 风格的链接按钮 */
.dx-link-button {
    color: #007acc !important;
    font-weight: 500;
    padding: 4px 8px;
    text-decoration: none;

    &:hover {
        color: #005a9e !important;
        text-decoration: underline;
    }
}
</style>
