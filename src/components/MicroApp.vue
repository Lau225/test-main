<template>
    <WujieVue
      :width="width"
      :height="height"
      :name="name"
      :url="url"
      :sync="sync"
      :alive="alive"
      :props="props"
      :beforeLoad="beforeLoad"
      :beforeMount="beforeMount"
      :afterMount="afterMount"
      :beforeUnmount="beforeUnmount"
      :afterUnmount="afterUnmount"
    />
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  

  const props = defineProps({
    width: '100%',
    height: '100%',
    sync: true,
    alive: true,
    props: () => ({})
  })
  
  // 生命周期钩子
  const beforeLoad = (appWindow) => {
    console.log(`${props.name} 开始加载`, appWindow)
  }
  
  const beforeMount = (appWindow) => {
    console.log(`${props.name} 开始挂载`, appWindow)
  }
  
  const afterMount = (appWindow) => {
    console.log(`${props.name} 挂载完成`, appWindow)
  }
  
  const beforeUnmount = (appWindow) => {
    console.log(`${props.name} 开始卸载`, appWindow)
  }
  
  const afterUnmount = (appWindow) => {
    console.log(`${props.name} 卸载完成`, appWindow)
  }
  </script>