import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import withNuxt from './.nuxt/eslint.config.mjs';
import pluginJest from 'eslint-plugin-jest';
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default withNuxt([
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  pluginJest.configs.recommended['flat/recommended'],
  ...compat.config({
    extends: ['plugin:cypress/recommended'],
  }),
  { 
    languageOptions: { 
      globals: globals.browser 
    },
    rules: {
      "vue/multi-word-component-names": 0,
      "vue/no-multiple-template-root": 0
    }
  },
]);