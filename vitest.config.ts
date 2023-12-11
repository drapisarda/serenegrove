import { defineConfig } from 'vitest/config'
import * as path from 'path';
import vue from '@vitejs/plugin-vue'
import * as persistedState from "@pinia-plugin-persistedstate/nuxt";

// export default defineVitestConfig({
export default defineConfig({
  plugins: [
    vue(),
    () => persistedState
  ],
  test: {
    globals: true,
    environment: 'happy-dom'
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './') },
    ],
  },
})