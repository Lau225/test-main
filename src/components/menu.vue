<template>
  <div class="responsive-menu-container">
    <div class="menu-wrapper">
      <!-- 桌面端菜单 -->
      <DxMenu v-if="!isMobile" :data-source="menuList" :orientation="orientation"
        :hide-submenu-on-mouse-leave="hideSubmenuOnMouseLeave" :show-first-submenu-mode="'onHover'"
        :show-submenu-mode="{ name: 'onHover', delay: { show: 0, hide: 400 } }" @item-click="itemClick"
        class="responsive-menu">
        <template #item="{ data }">
          <div class="menu-item-content">
            <el-icon v-if="data.icon" class="menu-item-icon">
              <component :is="data.icon" />
            </el-icon>
            <span>{{ data.name }}</span>
          </div>
        </template>
      </DxMenu>

      <!-- 移动端汉堡菜单按钮 -->
      <button v-if="isMobile" @click="toggleMobileMenu" class="mobile-menu-toggle" :class="{ active: showMobileMenu }">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- 移动端菜单覆盖层 -->
      <div v-if="isMobile && showMobileMenu" class="mobile-menu-overlay" @click="closeMobileMenu">
        <div class="mobile-menu-content" @click.stop>
          <DxTreeView :items="menuList" :expand-all="false" display-expr="name" @item-click="handleMobileItemClick"
            class="mobile-tree-menu" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import DxMenu from 'devextreme-vue/menu';
import DxTreeView from 'devextreme-vue/tree-view';
import { useRouter } from 'vue-router';
import { ElIcon } from 'element-plus';
const props = defineProps({
  menuList: Array
})

const router = useRouter()


// 响应式状态
const windowWidth = ref(window.innerWidth);
const isMobile = computed(() => windowWidth.value < 768);
const showMobileMenu = ref(false);

// 根据屏幕尺寸动态调整菜单方向
const orientation = computed(() =>
  isMobile.value ? 'vertical' : 'horizontal'
);

const hideSubmenuOnMouseLeave = ref(true);
const currentProduct = ref<any>();

// 监听窗口大小变化
const handleResize = () => {
  windowWidth.value = window.innerWidth;
  // 当从移动端切换到桌面端时，关闭移动端菜单
  if (!isMobile.value) {
    showMobileMenu.value = false;
  }
};

// 移动端菜单控制
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};

const closeMobileMenu = () => {
  showMobileMenu.value = false;
};

// 处理桌面端菜单点击
function itemClick(e) {
  if (e.itemData?.items) {
    return
  }
  router.push(e.itemData.path)

}

// 处理移动端菜单点击
function handleMobileItemClick(e: any) {
  if (e.itemData?.price) {
    currentProduct.value = e.itemData as any;
    closeMobileMenu();
  }
}

// 生命周期
onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>
<style scoped>
/* 响应式容器 */
.responsive-menu-container {
  width: 100%;
  background: transparent;
  border-radius: 0;
  overflow: visible;
  position: relative;
}

.responsive-menu-container::before {
  display: none;
}

.menu-wrapper {
  position: relative;
  max-width: none;
  margin: 0;
  display: flex;
  justify-content: flex-start;
  padding: 0;
  z-index: 1;
}

/* 桌面端菜单样式 */
.responsive-menu {
  width: 100%;
}

/* 移动端汉堡菜单按钮 */
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  padding: 6px;
  z-index: 1001;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
}

.mobile-menu-toggle:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.mobile-menu-toggle:active {
  background-color: rgba(255, 255, 255, 0.15);
  transform: scale(0.95);
}

.mobile-menu-toggle span {
  width: 22px;
  height: 3px;
  background: #ffffff;
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
  margin: 0 auto;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.mobile-menu-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.mobile-menu-toggle.active span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* 移动端菜单覆盖层 */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  justify-content: flex-start;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.mobile-menu-content {
  width: 85%;
  max-width: 320px;
  height: 100%;
  background: #1536cc;
  padding: 24px;
  overflow-y: auto;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.3);
  position: relative;
  animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(0);
  }
}

.mobile-menu-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.mobile-tree-menu {
  width: 100%;
  position: relative;
  z-index: 1;
}

/* 产品详情样式 */
.product-details {
  width: 100%;
  max-width: 400px;
  margin: 20px auto 0;
  text-align: center;
}

.product-details img {
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: contain;
  border-radius: 8px;
}

.product-details .name {
  font-size: 20px;
  margin: 16px 0 8px;
  font-weight: 600;
}

.product-details .price {
  font-size: 24px;
  color: #2196F3;
  font-weight: bold;
}

/* 平板端适配 (768px - 1024px) */
@media (max-width: 1024px) and (min-width: 768px) {
  .responsive-menu-container {
    border-radius: 0 0 18px 18px;
  }

  .product-details {
    max-width: 350px;
  }

  .product-details .name {
    font-size: 18px;
  }

  .product-details .price {
    font-size: 22px;
  }
}

/* 移动端适配 (< 768px) */
@media (max-width: 767px) {
  .responsive-menu-container {
    justify-content: flex-start;
    border-radius: 0 0 20px 20px;
  }

  .menu-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
  }

  /* 隐藏桌面端菜单，显示汉堡按钮 */
  .responsive-menu {
    display: none;
  }

  .mobile-menu-toggle {
    display: flex;
  }

  .product-details {
    max-width: 100%;
    margin: 16px 0;
  }

  .product-details img {
    max-height: 200px;
  }

  .product-details .name {
    font-size: 16px;
    margin: 12px 0 6px;
  }

  .product-details .price {
    font-size: 20px;
  }
}

/* 小屏手机适配 (< 480px) */
@media (max-width: 479px) {
  .responsive-menu-container {
    border-radius: 0 0 16px 16px;
  }

  .menu-wrapper {
    padding: 10px;
  }

  .mobile-menu-content {
    width: 90%;
    padding: 20px 16px;
  }

  .product-details img {
    max-height: 150px;
  }

  .product-details .name {
    font-size: 14px;
  }

  .product-details .price {
    font-size: 18px;
  }
}

/* 暗色主题支持 */
.dark .responsive-menu-container {
  background: transparent;
  box-shadow: none;
}

.dark .product-details .name,
.dark .product-details .price {
  color: #f0f0f0;
}

.dark .mobile-menu-content {
  background: #1a1a2e;
  color: #f0f0f0;
}

.dark .mobile-menu-toggle {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}

.dark .mobile-menu-toggle:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.dark .mobile-menu-toggle span {
  background: #f0f0f0;
}

/* DevExtreme 组件样式覆盖 */
:deep(.dx-menu) {
  width: auto;
  display: flex;
  justify-content: center;
  background: transparent !important;
  border: none !important;
}

:deep(.dx-menu-horizontal) {
  justify-content: center;
  display: flex;
  background: transparent !important;
}

:deep(.dx-menu-horizontal .dx-menu-items-container) {
  display: flex;
  justify-content: flex-start;
  background: transparent !important;
}

:deep(.dx-menu-item) {
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  margin: 0 !important;
  transition: none !important;
  backdrop-filter: none !important;
  min-height: 40px !important;
}

:deep(.dx-menu-item .dx-menu-item-content) {
  color: #ffffff !important;
  font-weight: 700 !important;
  padding: 10px 16px !important;
  border-radius: 0 !important;
  font-size: 16px !important;
  background: transparent !important;
  font-family: 'Microsoft YaHei', '微软雅黑', sans-serif !important;
}

:deep(.dx-menu-item.dx-state-focused) {
  background: transparent !important;
}

:deep(.dx-menu-item.dx-state-hover),
:deep(.dx-menu-item:hover) {
  background: transparent !important;
}

:deep(.dx-menu-item.dx-state-active) {
  background: transparent !important;
}

:deep(.dx-submenu) {
  background: #323232 !important;
  border: none !important;
  border-radius: 4px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
  backdrop-filter: none !important;
  margin-top: 4px !important;
  min-width: 120px !important;
  padding: 4px 0 !important;
}

:deep(.dx-submenu .dx-menu-item) {
  background: transparent !important;
  border: none !important;
  margin: 0 !important;
  border-radius: 0 !important;
  min-height: 40px !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

:deep(.dx-submenu .dx-menu-item .dx-menu-item-content) {
  color: rgba(255, 255, 255, 0.85) !important;
  padding: 10px 16px !important;
  font-weight: 400 !important;
  font-size: 14px !important;
  width: 100% !important;
  box-sizing: border-box !important;
  white-space: nowrap !important;
  font-family: 'Microsoft YaHei', '微软雅黑', sans-serif !important;
}

:deep(.dx-submenu .dx-menu-item:hover) {
  background: #409eff !important;
  transform: none !important;
  box-shadow: none !important;
}

:deep(.dx-submenu .dx-menu-item:hover .dx-menu-item-content) {
  color: #ffffff !important;
}

/* 移动端树形菜单样式 */
:deep(.dx-treeview) {
  background: transparent !important;
  color: #ffffff !important;
}

:deep(.dx-treeview-item) {
  padding: 14px 12px !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 8px !important;
  margin: 4px 0 !important;
  background: rgba(255, 255, 255, 0.05) !important;
  transition: all 0.3s ease !important;
}

:deep(.dx-treeview-item .dx-treeview-item-content) {
  color: #ffffff !important;
  font-weight: 500 !important;
}

:deep(.dx-treeview-item:hover) {
  background: rgba(255, 255, 255, 0.15) !important;
  transform: translateX(4px) !important;
}

:deep(.dx-treeview-node-container-opened > .dx-treeview-item) {
  background: rgba(255, 255, 255, 0.1) !important;
}

:deep(.dx-treeview-toggle-item-visibility) {
  color: #ffffff !important;
}

/* 暗色主题下的 DevExtreme 样式 */
.dark :deep(.dx-menu-item) {
  background: rgba(59, 130, 246, 0.25) !important;
  border-color: rgba(59, 130, 246, 0.35) !important;
}

.dark :deep(.dx-menu-item:hover) {
  background: rgba(59, 130, 246, 0.35) !important;
  border-color: rgba(59, 130, 246, 0.45) !important;
}

.dark :deep(.dx-submenu) {
  background: rgba(26, 26, 46, 0.95) !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
}

.dark :deep(.dx-submenu .dx-menu-item .dx-menu-item-content) {
  color: #f0f0f0 !important;
}

.dark :deep(.dx-submenu .dx-menu-item:hover) {
  background: rgba(255, 255, 255, 0.1) !important;
}

.dark :deep(.dx-treeview-item) {
  border-bottom-color: rgba(255, 255, 255, 0.05) !important;
  background: rgba(255, 255, 255, 0.02) !important;
}

.dark :deep(.dx-treeview-item:hover) {
  background: rgba(255, 255, 255, 0.08) !important;
}

/* 隐藏菜单项的下拉箭头 */
:deep(.dx-menu-item .dx-menu-item-popout-container),
:deep(.dx-menu-item .dx-icon-spindown),
:deep(.dx-menu-item .dx-icon-spinright),
:deep(.dx-menu-item .dx-menu-item-popout) {
  display: none !important;
}

/* 菜单项图标样式 */
.menu-item-content {
  display: flex;
  align-items: center;
}

.menu-item-icon {
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

}

.menu-item-icon :deep(svg path) {
  stroke: currentColor;
  stroke-width: 50;
}
</style>
