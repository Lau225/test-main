import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from "rollup-plugin-visualizer";
// https://vite.dev/config/
export default defineConfig(({ mode }) => {

  return {
    plugins: [
      vue(),
      visualizer({
        open: true,  //注意这里要设置为true，否则无效
        filename: "stats.html", //分析图生成的文件名
        gzipSize: true, // 收集 gzip 大小并将其显示
        brotliSize: true, // 收集 brotli 大小并将其显示
      }),
      AutoImport({
        imports: ['vue'],
        resolvers: [ElementPlusResolver()],
        dts: true // 生成类型声明文件
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        dts: true // 生成组件类型声明文件
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        // 尝试解决 Inferno 警告
        'inferno': 'inferno/dist/index.dev.esm.js',
      },
    },
    define: {
      // 添加 Vue3 特性标志（需要用 JSON.stringify 转换为字符串）
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false)
    },
    server: {
      port: 5177, // 主应用端口
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    },
    // 构建配置
    build: {
      target: 'esnext',
      minify: 'terser',
      // 构建时使用 terser 移除 console
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          manualChunks: undefined
        }
      }
    }
  }
})
