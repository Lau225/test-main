<template>
  <el-config-provider :locale="zhCn">
    <div id="app">
      <!-- 统一使用router-view，由路由配置决定渲染什么组件 -->
      <router-view />
    </div>
  </el-config-provider>
</template>

<script setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<style>
</style>