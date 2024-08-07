import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { createHtmlPlugin } from 'vite-plugin-html'
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons';
import { setting } from './src/config/index.js'
const { title, devPort } = setting

const alias = {
  '@': resolve(__dirname, 'src'),
  find: 'tw591svgicon'
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createHtmlPlugin({
      /**
       * 需要注入 index.html ejs 模版的数据
       */
      inject: {
        data: {
          PROJECT_TITLE: title
        }
      }
    }),
    createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), 'src/assets/svgs')],
        // 指定symbolId格式
        symbolId: 'icon-[name]',
      })
  ],
  resolve: { alias },
  server: {
    host: '0.0.0.0', // 监听ip
    port: devPort, // 端口号
    open: true, // 启动时自动在浏览器中打开
    proxy: {
      // '/v1': {
      //   target: 'http://192.168.0.118:8888',
      //   ws: true, // 是否启用websockets
      //   changeOrigin: true, // 运行跨域
      //   // rewrite: (path) => path.replace(/^\/v1/, ''), // 重写路径
      // },
    }
  },
  build: {
    sourcemap: false, // 是否生成源map
    chunkSizeWarningLimit: 1500, // 触发chunk警告大小
    rollupOptions: {
      output: {
        entryFileNames: `[name]-entry-[hash]` + new Date().getTime() + `.js`,
        chunkFileNames: `[name]-chunk-[hash]` + new Date().getTime() + `.js`,
        assetFileNames: `[name]-asset-[hash]` + new Date().getTime() + `.[ext]`,
        compact: true, // 这将缩小汇总生成的包装器代码。请注意，这不会影响用户编写的代码。此选项在捆绑预压缩代码时很有用
        manualChunks: {
          // 创建自定义共享公共块
          vue: ['vue', 'vue-router']
        }
      }
    }
  }
})
