
import './assets/base.css'
import './assets/theme.css'; // 添加这一行引入自定义主题
import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/dark/css-vars.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import WujieVue from 'wujie-vue3'
// 导入主题管理器
import 'devextreme/dist/css/dx.material.blue.light.css'
// 导入 Element Plus 样式
import 'element-plus/theme-chalk/dark/css-vars.css'
// 导入权限指令
import permission from './directives/permission'


// 过滤 Inferno 和 wujie 的开发模式警告
const originalWarn = console.warn
console.warn = (...args) => {
  const message = args[0]
  if (typeof message === 'string') {
    // 忽略 Inferno 相关的警告
    if (message.includes('Inferno')) {
      return
    }
    // 忽略 wujie iframe 中断警告
    if (message.includes('[wujie warn]') && message.includes('iframe主动中断')) {
      return
    }
  }
  originalWarn.apply(console, args)
}

const { setupApp, preloadApp } = WujieVue

const app = createApp(App)
const pinia = createPinia()

// 配置 Pinia
app.use(pinia)

// 配置无界
app.use(WujieVue)
import('./mock').then(({ default: mock }) => {
  // 这里mock模块被导入，拦截了相应的请求
  // 不需要执行什么，因为mock模块已经执行了拦截
})



// 设置子应用配置
setupApp({
  name: import.meta.env.VITE_APP_ONE_NAME,
  url: import.meta.env.VITE_APP_ONE,
  alive: true,
  degrade: false,
  exec: true,
  // props会在组件中通过:props动态传递
})

setupApp({
  name: import.meta.env.VITE_APP_TWO_NAME,
  url: import.meta.env.VITE_APP_TWO,
  alive: true,
  degrade: false,
  exec: true,
  // 可以在这里定义默认的props，也可以在组件中动态传递
})

app.use(router)

// 注册全局自定义指令
app.directive('permission', permission)

app.mount('#app')