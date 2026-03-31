<template>
  <!--保活模式，name相同则复用一个子应用实例，改变url无效，必须采用通信的方式告知路由变化 -->
  <WujieVue width="100%" height="100%" name="vue3" :url="vue3Url" :alive="true"></WujieVue>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import wujieVue from 'wujie-vue3';

const route = useRoute();
const base = import.meta.env.VITE_APP_ONE

// 保活模式下URL应该保持固定，不随路由变化
const vue3Url = ref(base);

// 将路由参数转换为字符串路径
const getPathString = (pathParam) => {
  if (!pathParam) return '';
  // 如果是数组，join成字符串
  if (Array.isArray(pathParam)) {
    return pathParam.join('/');
  }
  // 如果已经是字符串，直接返回
  return String(pathParam);
};

// 当前路径（用于传递给子应用）
const currentPath = computed(() => {
  const pathString = getPathString(route.params.path);
  if (!pathString) return '/';
  return pathString.startsWith('/') ? pathString : `/${pathString}`;
});

// 防抖处理，避免短时间内多次触发
let emitTimer = null;
const emitRouteChange = (path, query = {}) => {
  if (emitTimer) {
    clearTimeout(emitTimer);
  }
  emitTimer = setTimeout(() => {
    if (wujieVue.bus) {
      console.log('[主应用] 发送路由变化事件:', path, query);
      wujieVue.bus.$emit("vue3-router-change", { path, query });
    }
  }, 50); // 50ms防抖
};

// 立即发送初始路由，稍微延迟以确保子应用已准备好
const initialPath = getPathString(route.params.path);
if (initialPath) {
  // 确保路径格式正确
  const fullPath = initialPath.startsWith('/') ? initialPath : `/${initialPath}`;
  // 增加延迟，确保子应用的监听器已设置
  setTimeout(() => {
    emitRouteChange(fullPath, route.query);
  }, 100);
}

watch(
  () => route.fullPath,
  () => {
    const pathString = getPathString(route.params.path);
    if (pathString) {
      // 确保路径格式正确
      const fullPath = pathString.startsWith('/') ? pathString : `/${pathString}`;
      emitRouteChange(fullPath, route.query);
    }
  }
);
</script>

<style lang="less" scoped></style>
