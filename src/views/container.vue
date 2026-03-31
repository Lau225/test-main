<template>
  <div id="app">
    <div class="header-container">
      <myMenu class="desktop-menu" :menuList="menuList" />
      <div class="header-actions">
        <el-popover placement="bottom" :width="280" trigger="hover" @show="handlePopoverShow"
          popper-class="dark-popover">
          <template #reference>
            <div class="notification-wrapper">
              <img src="@/assets/picture/IconSet.svg" alt="通知" class="notification-icon-img" />
              <span v-if="!hasNewNotification" class="notification-dot"></span>
            </div>
          </template>
          <div class="notification-content">
            <div class="notification-header">消息通知</div>
            <div class="notification-list">
              <div v-for="(item, index) in notifications" :key="index" class="notification-item">
                <span class="notification-title">{{ item.title }}</span>
                <span class="notification-time">{{ item.time }}</span>
              </div>
              <div v-if="notifications.length === 0" class="notification-empty">
                暂无新消息
              </div>
            </div>
          </div>
        </el-popover>
        <el-dropdown trigger="hover" @command="handleUserCommand">
          <span class="user-dropdown">
            <span class="username">xxx</span>
            <el-icon class="el-icon--right">
              <ArrowDown />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <Tab style="width: 100%; max-width: 100%;">
    </Tab>
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <keep-alive ref="keepAliveRef" :include="cachedRoutes">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, provide } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import Tab from '@/components/tab.vue'
import MyMenu from '@/components/menu.vue'
import useMenuList from '@/hooks/useMenuList'
import WujieVue from 'wujie-vue3'
import { initMenu } from '@/utils/initMenu'
import { useMenu } from '@/store/menu'
const route = useRoute()
const router = useRouter()
const { cancelSelected, addMenu, clearMenuList } = useMenuList()

const menu = useMenu()

// ========== 通知功能 ==========
const hasNewNotification = ref(true)
const notifications = ref([
  { title: '系统更新通知', time: '10分钟前' },
  { title: '您有新的待办事项', time: '30分钟前' },
  { title: '欢迎使用本系统', time: '1小时前' }
])

const handlePopoverShow = () => {
  hasNewNotification.value = false
}

// 处理用户下拉菜单命令
const handleUserCommand = (command) => {
  if (command === 'logout') {
    logout()
  } else if (command === 'changePassword') {
    // TODO: 实现修改密码功能
    console.log('修改密码')
  }
}


// ========== Keep-Alive 缓存管理 ==========
const keepAliveRef = ref(null)
const cachedRoutes = ref([]) // 缓存的组件名列表

// 添加路由到缓存列表
const addRouteToCache = (routeName) => {
  if (routeName && !cachedRoutes.value.includes(routeName)) {
    cachedRoutes.value.push(routeName)
  }
}

// 清理特定路由的缓存
const clearSpecificRouteCache = (routeName) => {
  console.log(`[main] 开始清理路由缓存: ${routeName}`)

  if (!routeName) {
    console.warn('[main] 未提供组件名')
    return
  }

  // 从 include 列表中移除
  const index = cachedRoutes.value.indexOf(routeName)
  if (index > -1) {
    cachedRoutes.value.splice(index, 1)
    console.log(`[main] 已从 include 列表移除: ${routeName}`)
  }

  // 清理 keep-alive 内部缓存
  setTimeout(() => {
    if (keepAliveRef.value) {
      try {
        const keepAliveInstance = keepAliveRef.value
        if (keepAliveInstance.$?.subTree?.component) {
          const { cache, keys } = keepAliveInstance.$.subTree.component
          if (cache && keys) {
            cache.forEach((vnode, key) => {
              const name = vnode.type?.name || vnode.type?.__name
              if (name === routeName) {
                cache.delete(key)
                const keyIndex = keys.indexOf(key)
                if (keyIndex > -1) {
                  keys.splice(keyIndex, 1)
                }
                console.log(`[main] 缓存清理完成: ${routeName}`)
              }
            })
          }
        }
      } catch (error) {
        console.error('[main] 清理缓存时出错:', error)
      }
    }
  }, 100)
}

// 监听路由变化，动态添加到缓存列表
watch(() => route.name, (newName) => {
  if (newName && route.meta?.isLocalRoute) {
    addRouteToCache(newName)
  }
}, { immediate: true })

// 提供清理缓存的方法给子组件
provide('clearRouteCache', clearSpecificRouteCache)


const menuList = ref();
const permissionStr = localStorage.getItem('permission')
const permissionRaw = permissionStr ? JSON.parse(permissionStr) : null
const permission = permissionRaw?.permission || permissionRaw  // 兼容两种格式





const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('permission')
  menu.removeMainList()
  // 清空菜单列表
  clearMenuList()
  // 清空子应用路由信息
  subAppRoute.value = null
  vue2AppRoute.value = null
  router.replace('/login')
}

// 新增：存储子应用路由信息
const subAppRoute = ref(null)
const vue2AppRoute = ref(null)
// 使用 Wujie bus 通信
const { bus } = WujieVue
onMounted(() => {
  menuList.value = initMenu(permission)
  // 监听子应用准备就绪事件，发送当前路由信息
  bus.$on('sub-app-ready', () => {
    bus.$emit('route-change', 123)
  })
})
onUnmounted(() => {
  // 注意：不要移除监听器，因为它们是全局的，其他组件实例可能还在使用
})




</script>

<style>
/* TailwindCSS会处理box-sizing重置 */

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  padding: 0;
}

.main-header {
  background: #b26c17;
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.main-header h1 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.main-nav {
  display: flex;
  gap: 1rem;
}

.main-nav a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s;
}

.main-nav a:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.main-nav a.router-link-exact-active {
  background-color: #42b983;
  color: white;
}

.main-content {
  height: calc(100vh - 6.5rem);
  overflow: hidden;
  background: #0a0e27;
}

.micro-app-container {
  min-height: 500px;
  background: #ffffff;
}

.app-not-available {
  text-align: center;
  padding: 3rem;
  background: #fff3cd;
  color: #856404;
}

.app-not-available h3 {
  margin-bottom: 1rem;
  color: #856404;
}

/* 响应式设计 - 移动端适配 */
.header-container {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: nowrap;
  /* 确保不换行 */
  justify-content: space-between;
  /* 两端对齐 */
  padding: 10px;
  background: #323232;
  box-shadow: none;
}

/* 头部操作区域 */
.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 通知图标样式 */
.notification-wrapper {
  position: relative;
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-wrapper:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.notification-icon {
  font-size: 20px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-icon-img {
  width: 20px;
  height: 20px;
}

.notification-dot {
  position: absolute;
  top: 2px;
  right: 4px;
  width: 8px;
  height: 8px;
  background-color: #f56c6c;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* 通知弹窗内容样式 */
.notification-content {
  margin: -12px;
}

.notification-header {
  padding: 12px 16px;
  font-weight: 600;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.notification-list {
  max-height: 300px;
  overflow-y: auto;
}

.notification-item {
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: background-color 0.2s;
}

.notification-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-title {
  display: block;
  font-size: 14px;
  margin-bottom: 4px;
}

.notification-time {
  font-size: 12px;
  color: #909399;
}

.notification-empty {
  padding: 24px;
  text-align: center;
  color: #909399;
  font-size: 14px;
}

/* 用户下拉菜单样式 */
.user-dropdown {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.user-dropdown:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.username {
  font-size: 14px;
  margin-right: 4px;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-dropdown .el-icon--right {
  font-size: 12px;
}

/* 移动端样式 */
@media (max-width: 768px) {
  .desktop-menu {
    flex: 1;
  }

  /* 移动端菜单已通过v-if控制，这里只需要确保布局正确 */

  .header-container {
    padding: 5px 10px;
    /* 移动端减少上下内边距 */
  }

  .desktop-menu {
    display: flex;
    justify-content: flex-start;
    /* 汉堡按钮靠左 */
    flex: 1;
    /* 占据剩余空间 */
  }

  /* 确保登出按钮不被压缩 */
  .header-container>.dx-button {
    flex-shrink: 0;
    min-width: 40px;
  }




  .micro-app-container {
    min-height: 400px;
    /* 减少最小高度 */
  }
}

/* 平板端样式 */
@media (max-width: 1024px) and (min-width: 769px) {
  .header-container {
    gap: 8px;
    /* 稍微减少间距 */
  }

  .desktop-menu {
    flex: 1;
    min-width: 200px;
  }
}

/* 超小屏幕 */
@media (max-width: 480px) {

  .header-container {
    gap: 5px;
  }

  .micro-app-container {
    padding: 0.25rem;
    min-height: 300px;
  }
}
</style>
