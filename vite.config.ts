import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
  },
  plugins: [
    vue(),
    electron([
      { entry: 'electronMain/index.ts' },
      {
        entry: 'electronMain/preload.ts',
        onstart(options) {
          options.reload()
        },
      },
    ]),
  ],
})
