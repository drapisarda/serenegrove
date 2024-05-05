import { defineConfig } from 'vitest/config'
import * as path from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'happy-dom',
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, './') }],
  },
})
