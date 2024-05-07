import { defineConfig, configDefaults } from 'vitest/config'
import * as path from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ['Icon'].includes(tag),
        },
      },
    }),
  ],
  test: {
    watch: false,
    globals: true,
    environment: 'happy-dom',
    exclude: [...configDefaults.exclude, '**/pages/**'],
    coverage: {
      include: ['**/components/**', '**/composables/**', '**/stores/**'],
    },
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './') },
      {
        find: '#imports',
        replacement: path.resolve(__dirname, './.nuxt/imports.d.ts'),
      },
    ],
  },
})
