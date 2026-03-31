<template>
  <!--保活模式，name相同则复用一个子应用实例，改变url无效，必须采用通信的方式告知路由变化 -->
  <WujieVue 
    width="100%" 
    height="100%" 
    name="vue2" 
    :url="vue2Url"
    :alive="true"
  ></WujieVue>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import wujieVue from 'wujie-vue3';

const route = useRoute();
const base = import.meta.env.VITE_APP_TWO

// 保活模式下URL应该保持固定，不随路由变化
const vue2Url = ref(base);

// 防抖处理，避免短时间内多次触发
let emitTimer = null;
const emitRouteChange = (path) => {
  if (emitTimer) {
    clearTimeout(emitTimer);
  }
  emitTimer = setTimeout(() => {
    wujieVue.bus.$emit("vue2-router-change", path);
  }, 50); // 50ms防抖
};

watch(
  () => route.params.path,
  (newPath) => {
    if (newPath) {
      emitRouteChange(`/${newPath}`);
    }
  },
  { immediate: true }
);
</script>

<style lang="less" scoped></style>
