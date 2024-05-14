import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import withNuxt from './.nuxt/eslint.config.mjs'
import pluginJest from 'eslint-plugin-jest'
import { FlatCompat } from '@eslint/eslintrc'
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility'

const compat = new FlatCompat()

export default withNuxt([
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  pluginJest.configs.recommended['flat/recommended'],
  ...pluginVueA11y.configs['flat/recommended'],
  ...compat.config({
    extends: [
      'plugin:vue/vue3-essential',
      'plugin:cypress/recommended',
      'plugin:prettier/recommended',
      'prettier',
    ],
  }),
  {
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'vue/multi-word-component-names': 0,
      'vue/no-multiple-template-root': 0,
      '@typescript-eslint/no-explicit-any': 0,
    },
  },
])
