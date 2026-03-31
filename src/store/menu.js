import { defineStore } from 'pinia'
import request from '@/utils/request'

// 定义并导出store，第一个参数是store的唯一ID
export const useMenu = defineStore('menu', {
  // 状态
  state: () => ({
    meunList: [],
    mainList: [],
    permissionLoaded: false, // 权限是否已加载
    permissionData: null // 存储完整的权限数据
  }),
  // 动作
  actions: {
    addMenuList(menuList) {
      // 确保 meunList 是数组
      if (!Array.isArray(this.meunList)) {
        this.meunList = [];
      }
      this.meunList.push(menuList)
    },
    addMainList(menuList) {
      this.mainList.push(menuList)
    },
    removeMainList() {
      this.mainList = []
    },
    // 添加清空方法
    clearMenuList() {
      this.meunList = [];
    },
    
    /**
     * 获取权限数据
     * @returns {Promise} 返回权限数据
     */
    async fetchPermission() {
      try {
        console.log('[权限] 开始获取权限数据...')
        
        // 调用权限接口
        const response = await request.get('/permission')
        
        // 假设返回的数据格式为 { code: 200, data: { base: [...], vue2: [...], vue3: [...] } }
        const permissionData = response.data || response
        
        // 保存权限数据到 localStorage
        localStorage.setItem('permission', JSON.stringify(permissionData))
        
        // 更新 store 状态
        this.permissionData = permissionData
        this.permissionLoaded = true
        
        // 如果有 base 数据，更新 mainList
        if (permissionData.base && Array.isArray(permissionData.base)) {
          this.mainList = permissionData.base
        }
        
        console.log('[权限] 权限数据获取成功', permissionData)
        return permissionData
      } catch (error) {
        console.error('[权限] 获取权限数据失败:', error)
        this.permissionLoaded = false
        throw error
      }
    },
    
    /**
     * 清除权限数据
     */
    clearPermission() {
      this.permissionData = null
      this.permissionLoaded = false
      this.mainList = []
      this.meunList = []
      localStorage.removeItem('permission')
      console.log('[权限] 权限数据已清除')
    }
  }
})