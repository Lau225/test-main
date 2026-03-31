import { createRouter, createWebHistory } from 'vue-router'
import { progress } from '@/utils/nprogress'
import Vue3Sub from '@/components/vue3Sub.vue'
import Vue2Sub from '@/components/vue2Sub.vue'
import { findPermissionByPath } from '@/utils/permission'

const vue3AppName = import.meta.env.VITE_APP_ONE_NAME
const vue2AppName = import.meta.env.VITE_APP_TWO_NAME



// 路由工具函数
export const routeUtils = {
  // 获取登录后的重定向路径
  getRedirectPath() {
    const urlParams = new URLSearchParams(window.location.search)
    const redirect = urlParams.get('redirect')
    return redirect ? decodeURIComponent(redirect) : '/home'
  },

  // 登录成功后的跳转
  redirectAfterLogin() {
    const redirectPath = this.getRedirectPath()
    // 清除URL中的redirect参数
    window.history.replaceState({}, '', window.location.pathname)
    return redirectPath
  },

  // 检查token是否有效（可以扩展为更复杂的验证）
  isTokenValid() {
    const token = localStorage.getItem('token')
    if (!token) return false

    // 这里可以添加更多验证逻辑，比如：
    // - 检查token是否过期
    // - 验证token格式
    // - 发送请求验证token有效性

    return true
  }
}
const routes = [
  { path: '/login', name: 'Login', component: () => import('@/views/Login.vue') },
  // 主布局路由 - container作为布局组件
  {
    path: '/',
    name: 'Container',
    component: () => import('../views/container.vue'),
    redirect: '/home',  // 默认重定向到首页
    children: [
      // 本项目的页面路由
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: { title: '首页', isLocalRoute: true }
      },
      {
        path: 'fly',
        name: 'Fly',
        component: () => import('../views/Fly.vue'),
        meta: { title: '空域', isLocalRoute: true }
      },
      {
        path: 'map',
        name: 'Map',
        component: () => import('../views/Map.vue'),
        meta: { title: '地图', isLocalRoute: true }
      },
      // 子应用路由 - 这些路由不需要具体的组件，由container处理
      {
        path: `/${vue3AppName}/:path(.*)*`,
        name: vue3AppName,
        component: Vue3Sub
      },
      {
        path: `/${vue2AppName}/:path(.*)*`,
        name: vue2AppName,
        component: Vue2Sub
      }
    ]
  },
  // 404 页面 - 必须放在最后
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: { title: '页面未找到' }
  }
]
function addPermissionRoutes() {
  const permissionData = localStorage.getItem('permission')
  if (!permissionData) {
    console.log('没有找到权限数据')
    return
  }

  try {
    const base = JSON.parse(permissionData)
    if (base && Array.isArray(base)) {


      base.forEach(item => {
        // 只处理 type 为 main 的项，跳过 type 为 children 的项
        if (item.type === 'children') {
          return
        }

        if (item.type !== 'main') {
          return
        }

        if (item.items && Array.isArray(item.items)) {


          // 遍历 items 创建路由
          item.items.forEach(subItem => {
            const path = subItem.path.startsWith('/') ? subItem.path.slice(1) : subItem.path
            // 使用 component 字段来加载组件，如果没有则使用 path
            let componentPath = subItem.component || subItem.path
            // 去掉开头的斜杠，避免路径变成 ../views//xxx.vue
            componentPath = componentPath.startsWith('/') ? componentPath.slice(1) : componentPath

            const route = {
              path: path,
              name: subItem.name,
              component: () => {
                // 根据组件路径动态加载组件
                const modules = import.meta.glob('../views/**/*.vue')
                const fullPath = `../views/${componentPath}.vue`

                if (modules[fullPath]) {
                  return modules[fullPath]()
                } else {
                  return Promise.resolve({
                    template: '<div style="padding: 2rem; color: red;">组件加载失败: ' + fullPath + '</div>'
                  })
                }
              },
              meta: {
                ...subItem.meta,
                isLocalRoute: true
              }
            }

            // 使用 addRoute 动态添加路由到父路由 'Container' 下作为子路由
            router.addRoute('Container', route)

          })
        } else {
          const path = item.path.startsWith('/') ? item.path.slice(1) : item.path
          const route = {
            path: path,
            name: item.name,
            component: () => {
              // 根据路径动态加载组件
              const modules = import.meta.glob('../views/**/*.vue')
              const componentPath = `../views/${item.path}.vue`

              if (modules[componentPath]) {
                return modules[componentPath]()
              } else {
                console.error(`组件未找到: ${componentPath}`)
              }
            },
            meta: {
              ...item.meta,
              isLocalRoute: true
            }
          }

          // 使用 addRoute 动态添加路由到父路由 'Container' 下作为子路由
          router.addRoute('Container', route)
        }
      })
    }
  } catch (error) {
    console.error('解析权限数据失败:', error)
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes
})
// 应用初始化时尝试加载权限路由
addPermissionRoutes()


// 白名单路由 - 不需要token就能访问的页面
const whiteList = ['/login']

// 从permission中提取所有路径（递归遍历所有层级）
const getAllPathsFromPermission = () => {
  const permission = localStorage.getItem('permission')
  if (!permission) return []

  try {
    const permissionData = JSON.parse(permission)
    const allPaths = []

    // 递归提取所有层级的 path
    const extractPaths = (items) => {
      if (!Array.isArray(items)) return
      items.forEach(item => {
        if (item.path) {
          allPaths.push(item.path)
        }
        // 递归处理子级 items
        if (item.items && Array.isArray(item.items)) {
          extractPaths(item.items)
        }
      })
    }

    // permission 现在是一个数组，直接遍历
    if (Array.isArray(permissionData)) {
      extractPaths(permissionData)
    }

    return allPaths
  } catch (error) {
    console.error('解析permission数据失败:', error)
    return []
  }
}

// 获取所有权限路径
const allPermissionPaths = getAllPathsFromPermission()


// 进度条超时保护
let progressTimer = null

// 路由前置守卫
router.beforeEach((to, from, next) => {
  // 清除之前的定时器
  if (progressTimer) {
    clearTimeout(progressTimer)
  }

  // 开始进度条
  progress.start()

  // 设置超时保护，确保进度条不会一直卡住
  progressTimer = setTimeout(() => {
    progress.done()
    console.warn('路由跳转超时，强制结束进度条')
  }, 5000) // 5秒超时

  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - 我的应用`
  }

  // 检查token是否有效
  const hasValidToken = routeUtils.isTokenValid()

  // 判断是否在白名单中
  const isInWhiteList = whiteList.includes(to.path)

  if (hasValidToken) {
    // 🟢 有token的情况
    if (to.path === '/login') {
      next('/')
    } else if (to.path === '/') {
      // 访问根路径，直接放行
      next()
    } else {
      // 访问其他页面，需要权限验证
      const isLocalRoute = to.meta?.isLocalRoute === true

      // 检查权限：支持完整路径（含query）或纯路径匹配
      const hasPermission = allPermissionPaths.some(permPath => {
        const permPathOnly = permPath.split('?')[0]
        return to.fullPath === permPath || to.path === permPathOnly
      })

      if (hasPermission || isLocalRoute) {
        next()
      } else {
        next({ name: 'NotFound' })
      }
    }
  } else {
    // 🔴 没有token的情况
    if (isInWhiteList) {
      // 访问白名单页面（如登录页），直接放行
      next()
    } else {
      // 保存原始访问路径，登录后可以跳转回来
      const redirect = encodeURIComponent(to.fullPath)
      next(`/login?redirect=${redirect}`)
    }
  }
})

// 路由后置守卫
router.afterEach((to, from) => {
  // 清除超时定时器
  if (progressTimer) {
    clearTimeout(progressTimer)
    progressTimer = null
  }

  // 结束进度条
  progress.done()

  // 滚动到顶部
  window.scrollTo(0, 0)
})

// 路由错误处理
router.onError((error) => {
  progress.done()
  console.error('路由错误:', error)
})

export default router