import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import withNuxt from './.nuxt/eslint.config.mjs';
import pluginJest from 'eslint-plugin-jest';

export default withNuxt([
  { 
    languageOptions: { 
      globals: globals.browser 
    },
    rules: {
      "vue/multi-word-component-names": ["off", {
        "ignores": ['']
      }],
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
]);