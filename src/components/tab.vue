<template>
  <div ref="tabContainer" class="tab-container">
    <div ref="tabScrollWrapper" class="tab-scroll-wrapper">
      <CustomTag cursor="pointer" v-for="tag in tags" :key="tag.name" @click="tap(tag)" :closable="tags.length > 1"
        :type="tag.type" @close="handleClose(tag)">
        {{ tag.name }}
      </CustomTag>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick, inject, computed } from 'vue'
import { useMenu } from '@/store/menu';
import { useRoute, useRouter } from 'vue-router';
import useMenuList from '@/hooks/useMenuList'
import CustomTag from './CustomTag.vue'
import wujieVue from 'wujie-vue3'
const menu = useMenu()
const router = useRouter()
const route = useRoute()
const { cancelSelected, addMenu } = useMenuList()

// 注入父组件提供的清理缓存方法
const clearRouteCache = inject('clearRouteCache', null)

// 引用DOM元素
const tabContainer = ref(null)
const tabScrollWrapper = ref(null)
const vue2AppName = import.meta.env.VITE_APP_TWO_NAME
const vue3AppName = import.meta.env.VITE_APP_ONE_NAME
// 检查是否需要滚动
const checkScrollable = async () => {
  await nextTick()
  if (tabContainer.value && tabScrollWrapper.value) {
    const container = tabContainer.value
    const wrapper = tabScrollWrapper.value

    const scrollWidth = wrapper.scrollWidth
    const clientWidth = wrapper.clientWidth
    const isScrollable = scrollWidth > clientWidth

    if (isScrollable) {
      container.classList.add('scrollable')
    } else {
      container.classList.remove('scrollable')
    }
  }
}

// 滚动到激活的标签
const scrollToActiveTag = async () => {
  await nextTick()
  if (tabScrollWrapper.value) {
    const activeTag = tabScrollWrapper.value.querySelector('.custom-tag--primary')
    if (activeTag) {
      activeTag.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      })
    }
  }
}

// 鼠标拖拽滚动功能
const setupDragScroll = () => {
  if (!tabScrollWrapper.value) return

  const wrapper = tabScrollWrapper.value
  let isDown = false
  let startX = 0
  let scrollLeft = 0
  let hasMoved = false // 标记是否真正拖动了

  // 鼠标按下
  const handleMouseDown = (e) => {
    isDown = true
    hasMoved = false
    startX = e.pageX - wrapper.offsetLeft
    scrollLeft = wrapper.scrollLeft
    // 不在这里preventDefault，让点击事件正常触发
  }

  // 鼠标离开
  const handleMouseLeave = () => {
    isDown = false
    hasMoved = false
    wrapper.classList.remove('dragging')
  }

  // 鼠标松开
  const handleMouseUp = () => {
    isDown = false
    hasMoved = false
    wrapper.classList.remove('dragging')
  }

  // 鼠标移动
  const handleMouseMove = (e) => {
    if (!isDown) return

    const x = e.pageX - wrapper.offsetLeft
    const distance = Math.abs(x - startX)

    // 只有移动距离超过阈值才认为是拖拽
    if (distance > 5) {
      if (!hasMoved) {
        hasMoved = true
        wrapper.classList.add('dragging')
        e.preventDefault() // 只在真正拖拽时才阻止默认行为
      }

      const walk = (x - startX) * 2 // 滚动速度倍数
      wrapper.scrollLeft = scrollLeft - walk
    }
  }

  // 鼠标滚轮滚动
  const handleWheel = (e) => {
    e.preventDefault()
    wrapper.scrollLeft += e.deltaY // 将垂直滚动转为水平滚动
  }

  // 绑定事件
  wrapper.addEventListener('mousedown', handleMouseDown)
  wrapper.addEventListener('mouseleave', handleMouseLeave)
  wrapper.addEventListener('mouseup', handleMouseUp)
  wrapper.addEventListener('mousemove', handleMouseMove)
  wrapper.addEventListener('wheel', handleWheel, { passive: false })

  // 返回清理函数
  return () => {
    wrapper.removeEventListener('mousedown', handleMouseDown)
    wrapper.removeEventListener('mouseleave', handleMouseLeave)
    wrapper.removeEventListener('mouseup', handleMouseUp)
    wrapper.removeEventListener('mousemove', handleMouseMove)
    wrapper.removeEventListener('wheel', handleWheel)
  }
}
const handleClose = (tag) => {
  const index = menu.meunList.indexOf(tag)

  // 清理子应用内特定路由的keep-alive缓存
  if (tag.path && (tag.path.startsWith(`/${vue3AppName}`) || tag.path.startsWith(`/${vue2AppName}`))) {
    const appName = tag.path.startsWith(`/${vue3AppName}`) ? vue3AppName : vue2AppName
    // 重写一个正则表达式
    const regex = new RegExp(`^\/${appName}`)
    const routePath = tag.path.replace(regex, '') // 提取路由路径，如 /home
    try {
      // 如果关闭的是 map 页面，先发送暂停 WebSocket 事件
      // 防止清理缓存时的路由跳转触发 WebSocket 恢复
      // if (routePath === '/map' && wujieVue?.bus) {
      //   console.log('[主应用] 关闭 map tab，发送 vue3-ws-pause')
      //   wujieVue.bus.$emit('vue3-ws-pause')
      // }

      // 通过wujie bus通知子应用清理特定路由的keep-alive缓存
      if (wujieVue?.bus) {

        wujieVue.bus.$emit(`${appName}-clear-route-cache`, routePath)
      }

    } catch (error) {
      console.error('❌ 处理子应用缓存时出错:', error)
    }
  } else if (tag.routeName && clearRouteCache) {
    // 清理主应用本地路由的keep-alive缓存
    clearRouteCache(tag.routeName)
  }

  // 如果要关闭的是当前激活的tag（primary）
  if (tag.type === 'primary') {
    // 删除当前tag
    menu.meunList.splice(index, 1)

    // 如果还有其他tag，激活相邻的tag
    if (menu.meunList.length > 0) {
      let nextActiveIndex = index > 0 ? index - 1 : 0
      if (nextActiveIndex >= menu.meunList.length) {
        nextActiveIndex = menu.meunList.length - 1
      }
      menu.meunList[nextActiveIndex].type = 'primary'
      router.push(menu.meunList[nextActiveIndex].path)
    }
  } else {
    // 如果关闭的不是当前激活的tag，直接删除
    menu.meunList.splice(index, 1)
  }

  // 关闭后检查滚动状态
  checkScrollable()
}

const tap = (tag) => {
  // 点击后改变颜色，改变颜色之前需要把之前的type设置为info，并且跳转到相应的路由页面
  cancelSelected()
  tag.type = 'primary'
  router.push(tag.path)

  // 滚动到激活的标签
  scrollToActiveTag()
}

const tags = ref(menu.meunList)
const permission = computed(() => {
  return localStorage.getItem('permission')
})

// 在permission中查找与路径匹配的项（递归查找支持多级菜单）
const findMatchingItem = (targetPath) => {
  if (!permission.value) return null

  try {
    const permissionData = JSON.parse(permission.value)

    // 递归查找函数
    const searchInItems = (items, parentRoute) => {
      for (const item of items) {
        const permPathOnly = targetPath.split('?')[0]
        // 检查当前项的path是否匹配
        if (item.path === permPathOnly) {
          return {
            route: parentRoute || item,
            item: {
              ...item,
              path: targetPath
            }
          }
        }
        // 如果有items子项，递归查找
        if (item.items && Array.isArray(item.items)) {
          const found = searchInItems(item.items, parentRoute || item)
          if (found) return found
        }
      }
      return null
    }

    // permission 现在是一个数组，直接遍历
    if (Array.isArray(permissionData)) {
      const result = searchInItems(permissionData, null)
      if (result) return result
    }

    return null
  } catch (error) {
    console.error('解析permission数据失败:', error)
    return null
  }
}
// 监听标签列表变化，更新滚动状态
watch(() => menu.meunList.length, () => {
  checkScrollable()
}, { flush: 'post' })

// 存储清理函数
let cleanupDragScroll = null

// 组件挂载后检查滚动状态
onMounted(() => {
  checkScrollable()

  // 设置拖拽滚动功能
  cleanupDragScroll = setupDragScroll()

  // 监听窗口大小变化
  window.addEventListener('resize', checkScrollable)
})

// 组件卸载时清理
onUnmounted(() => {
  window.removeEventListener('resize', checkScrollable)
  if (cleanupDragScroll) {
    cleanupDragScroll()
  }
})

watch(() => route.fullPath, (newPath) => {
  console.log(newPath);

  // 查找匹配的权限项
  cancelSelected()
  const matchedItem = findMatchingItem(newPath)
  if (matchedItem) {
    const name = matchedItem.item?.meta?.title
    const path = matchedItem.item?.path
    // 获取路由名称，用于清理 keep-alive 缓存
    const routeName = route.name

    // 寻找menu.meunList中是否有当前路由的path
    const existingTag = menu.meunList.find(tag => tag.path === path)
    if (existingTag) {
      // 如果有则将type设置为primary
      existingTag.type = 'primary'
      return
    }
    addMenu({
      name,
      path,
      type: 'primary',
      routeName
    })
  } else {
  }

}, {
  immediate: true
})

// 监听路由变化，通知子应用 WebSocket 暂停/恢复
let previousPath = route.fullPath
watch(() => route.fullPath, (newPath) => {
  if (!wujieVue?.bus) return

  const wasInVue3 = previousPath?.startsWith(`/${vue3AppName}/map`)
  const isInVue3 = newPath?.startsWith(`/${vue3AppName}/map`)

  // 从 vue3 子应用离开
  if (wasInVue3 && !isInVue3) {
    console.log('[主应用] 路由离开 vue3，发送 vue3-ws-pause')
    wujieVue.bus.$emit('vue3-ws-pause')
  }

  // 进入 vue3 子应用
  if (!wasInVue3 && isInVue3) {
    console.log('[主应用] 路由进入 vue3，发送 vue3-ws-resume')
    wujieVue.bus.$emit('vue3-ws-resume')
  }

  previousPath = newPath
})

// 监听子应用请求 WebSocket 状态的事件
// 当子应用 map 组件挂载时，会请求主应用发送当前状态
onMounted(() => {
  // if (wujieVue?.bus) {
  //   wujieVue.bus.$on('vue3-ws-request-status', () => {
  //     const isInMap = route.fullPath?.startsWith(`/${vue3AppName}/map`)
  //     console.log(`[主应用] 收到 WebSocket 状态请求，当前路由: ${route.fullPath}, 是否在 map: ${isInMap}`)
  //     if (isInMap) {
  //       console.log('[主应用] 当前在 map 页面，发送 vue3-ws-resume')
  //       wujieVue.bus.$emit('vue3-ws-resume')
  //     } else {
  //       console.log('[主应用] 当前不在 map 页面，发送 vue3-ws-pause')
  //       wujieVue.bus.$emit('vue3-ws-pause')
  //     }
  //   })
  // }
})

onUnmounted(() => {
  // if (wujieVue?.bus) {
  //   wujieVue.bus.$off('vue3-ws-request-status')
  // }
})

</script>

<style scoped>
.tab-container {
  width: 100%;
  max-width: 100%;
  position: relative;
  overflow: hidden;
  /* 确保容器不会溢出 */
  background: #262626;
  border-bottom: none;
}

.tab-scroll-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  width: 100%;
  min-width: 0;
  height: 44px;
  padding: 6px 8px;
  /* 重要：允许flex容器收缩 */

  /* 隐藏滚动条 - Firefox */
  scrollbar-width: none;

  /* 隐藏滚动条 - IE */
  -ms-overflow-style: none;

  /* 平滑滚动 */
  scroll-behavior: smooth;

  /* 防止选中文本 */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* 隐藏滚动条 - Webkit浏览器 (Chrome, Safari, Edge) */
.tab-scroll-wrapper::-webkit-scrollbar {
  display: none;
}

/* 确保标签不会换行和收缩 */
:deep(.tab-scroll-wrapper .custom-tag) {
  flex-shrink: 0;
  /* 防止标签收缩 */
  flex-grow: 0;
  /* 防止标签扩展 */
  white-space: nowrap;
  min-width: fit-content;
  /* 确保标签有最小宽度 */
}

/* 确保标签容器可以滚动 */
.tab-scroll-wrapper {
  flex-wrap: nowrap !important;
  /* 强制不换行 */
  cursor: default;
  /* 默认光标，让标签自己控制光标样式 */
}

/* 拖拽时的样式 */
.tab-scroll-wrapper.dragging {
  cursor: grabbing;
  /* 拖拽中的光标 */
  user-select: none;
  /* 防止选中文本 */
}

/* 标签的光标样式 */
:deep(.tab-scroll-wrapper .custom-tag) {
  cursor: pointer;
  /* 标签显示点击光标 */
}

/* 标签关闭按钮的光标样式 */
:deep(.tab-scroll-wrapper .custom-tag .custom-tag__close) {
  cursor: pointer;
}

/* 拖拽时禁用标签的hover效果 */
.tab-scroll-wrapper.dragging :deep(.custom-tag) {
  pointer-events: none;
}

/* 可选：添加渐变遮罩效果，显示可滚动状态 */
.tab-container::before,
.tab-container::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 20px;
  pointer-events: none;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.tab-container::before {
  left: 0;
  background: linear-gradient(to right, #242731, transparent);
}

.tab-container::after {
  right: 0;
  background: linear-gradient(to left, #242731, transparent);
}

/* 当内容可滚动时显示渐变遮罩 */
.tab-container.scrollable::before,
.tab-container.scrollable::after {
  opacity: 1;
}

/* 移动端优化 */
@media (max-width: 768px) {


  .tab-scroll-wrapper {
    gap: 8px;
    /* 增加标签间距 */
  }

  :deep(.tab-scroll-wrapper .custom-tag) {
    font-size: 12px;
    /* 移动端使用较小字体 */
    padding: 4px 8px;
    /* 调整内边距 */
  }

  /* 移动端隐藏渐变遮罩，因为有原生滚动指示器 */
  .tab-container::before,
  .tab-container::after {
    display: none;
  }
}

:deep(.tab-scroll-wrapper) {
  margin-left: 0;
}

:deep(.tab-scroll-wrapper .custom-tag--primary) {
  position: relative;
  box-shadow: none;
}

:deep(.tab-scroll-wrapper .custom-tag--primary)::before {
  display: none;
}

:deep(.tab-scroll-wrapper .custom-tag--info) {
  position: relative;
}

:deep(.tab-scroll-wrapper .custom-tag--info:not(:first-child))::before {
  display: none;
}

/* 超小屏幕优化 */
@media (max-width: 480px) {
  .tab-scroll-wrapper {
    gap: 6px;
  }

  :deep(.tab-scroll-wrapper .custom-tag) {
    font-size: 11px;
    padding: 3px 6px;
  }
}
</style>
