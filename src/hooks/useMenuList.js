// 创建钩子函数
import { useMenu } from '@/store/menu'
export default function useMenuList() {
    const menu = useMenu()
    const cancelSelected = () => {
        // 将其他tag的type变成info
        menu.meunList.forEach(tag => {
            tag.type = 'info'
        })
    }
    const addMenu = (item) => {

        // 优化名称获取逻辑
        const itemName = item.name

        const menuItem = {
            name: itemName,
            type: 'primary',
            //生成唯一的key值
            id: menu.meunList.length + 1,
            path: item.path,
            // 保存路由名称，用于清理 keep-alive 缓存
            routeName: item.routeName || null
        }
        menu.addMenuList(menuItem)
    }
    const clearMenuList = () => {
        menu.meunList = []
    }
    return {
        cancelSelected,
        addMenu,
        clearMenuList
    }
}
