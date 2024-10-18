import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  return (
    {
      plugins: [react()],
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "src"),
        },
      },
      css: {
        preprocessorOptions: {
          less: {
            // 这里可以添加 LESS 的配置，例如修改全局变量
            javascriptEnabled: true,
          },
        },
      },
      server: {
        proxy: {
          // 跨域代理
          '/api': {
            target: env.VITE_APP_API_URL,
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '')
          },
        }
      }
    }
  )
})
