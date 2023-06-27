import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // To fix amplify issue with vite
    global: "globalThis"
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      },
      // To fix amplify issue with vite
      {
        find: "./runtimeConfig",
        replacement: "./runtimeConfig.browser",
      }
    ]
  }
})
