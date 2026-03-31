/**
 * 权限相关工具函数
 */

/**
 * 递归查找permission中path匹配的项
 * @param {string} targetPath - 要查找的路径（to.fullPath）
 * @param {boolean} debug - 是否开启调试模式，默认false
 * @returns {Object|null} - 找到的权限项，如果没找到返回null
 */
export function findPermissionByPath(targetPath, debug = false) {
  if (debug) {
    console.log('🔍 开始查找路径:', targetPath)
  }

  // 从localStorage读取permission数据
  const permissionStr = localStorage.getItem('permission')
  if (!permissionStr) {
    console.warn('❌ localStorage中没有找到permisson数据')
    return null
  }

  let permission
  try {
    permission = JSON.parse(permissionStr)
    if (debug) {
      console.log('✅ 成功解析permission数据:', permission)
    }
  } catch (error) {
    console.error('❌ 解析permission数据失败:', error)
    return null
  }

  // 处理targetPath，去除可能的查询参数和hash
  const cleanPath = targetPath.split('?')[0].split('#')[0]
  if (debug && cleanPath !== targetPath) {
    console.log('🔧 清理后的路径:', cleanPath, '(原路径:', targetPath, ')')
  }

  // 递归查找函数
  function searchInItems(items, level = 0) {
    if (!Array.isArray(items)) {
      if (debug) {
        console.warn('⚠️ items不是数组:', items)
      }
      return null
    }

    for (const item of items) {
      if (debug) {
        console.log('  '.repeat(level) + '检查项:', item.path || item.title || '(无path)')
      }

      // 检查当前项的path是否匹配（支持完全匹配和去除查询参数后的匹配）
      if (item.path && (item.path === targetPath || item.path === cleanPath)) {
        if (debug) {
          console.log('✅ 找到匹配项:', item)
        }
        return item
      }

      // 如果当前项有子项，递归查找
      if (item.items && item.items.length > 0) {
        const found = searchInItems(item.items, level + 1)
        if (found) {
          return found
        }
      }
    }

    return null
  }

  // 开始查找
  const result = searchInItems(permission)

  if (debug) {
    if (result) {
      console.log('✅ 查找成功:', result)
    } else {
      console.log('❌ 未找到匹配的权限项')
    }
  }

  return result
}
