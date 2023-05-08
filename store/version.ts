import { defineStore } from "pinia";

export const useVersionStore = defineStore("version", {
  state: () => ({
    version: '0.1' as string,
  }),
  actions: {
    getVersion(): string {
      return this.$state.version;
    }
  }
});