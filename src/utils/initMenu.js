// 初始化菜单
import { useMenu } from '@/store/menu'
import { markRaw } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 递归处理菜单项，支持多级菜单
const processMenuItem = (item, parentId) => {
  const menuPath = item.path?.startsWith('/') ? item.path : `/${item.path || ''}`

  const menuItem = {
    id: item.id || `${parentId}_${item.name}`,
    name: item.meta?.title || item.name,
    path: menuPath,
    component: item.component,
    meta: item.meta,
    // 根据 remark 字段禁用菜单
    disabled: item.remark === '1'
  }

  // 如果有子菜单，递归处理，过滤掉 hide 为 true 的项
  if (item.items && item.items.length > 0 && Array.isArray(item.items)) {
    menuItem.items = item.items
      .filter(subItem => subItem.hide !== true && subItem.hide !== 'true')
      .map(subItem => processMenuItem(subItem, menuItem.id))
  }

  return menuItem
}

export const initMenu = (permission) => {
  const menuStore = useMenu()
  const { mainList } = menuStore

  // 如果没有 permission 数据或不是数组，直接返回
  if (!permission || !Array.isArray(permission)) {
    return mainList
  }

  // 过滤掉 hide 为 true 的主菜单项
  permission
    .filter(item => item.hide !== true && item.hide !== 'true')
    .forEach(item => {
      if (item.items && item.items.length > 0 && Array.isArray(item.items)) {
        // 检查是否已经存在该菜单
        const existingMenu = mainList.find(menu => menu.id === item.id || menu.name === item.name)
        if (existingMenu) {
          return
        }

        // 过滤掉 hide 为 true 的子菜单项
        const filteredItems = item.items
          .filter(subItem => subItem.hide !== true && subItem.hide !== 'true')
          .map(subItem => processMenuItem(subItem, item.id))

        // 构建菜单对象，递归处理所有层级
        // 主级菜单优先使用 title，没有则使用 meta.title，最后使用 name
        const iconName = item.menuIcon
        const menuObj = {
          id: item.id,
          name: item.title || item.meta?.title || item.name,
          icon: iconName ? markRaw(ElementPlusIconsVue[iconName]) : undefined, // 转换为图标组件
          items: filteredItems,
          // 根据 remark 字段禁用菜单
          disabled: item.remark === '1'
        }

        menuStore.addMainList(menuObj)
      }
    })

  return mainList
}