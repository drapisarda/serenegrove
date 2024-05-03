import { defineStore } from "pinia";
import { type ToastMessage } from "./types";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    version: '0.5' as string,
    toastMessage: {} as ToastMessage,
  }),
  actions: {
    getVersion(): string {
      return this.$state.version;
    },
    getToastMessage(): ToastMessage {
      return this.$state.toastMessage;
    },
    setToastMessage(message: string, style = 'success'): void {
      this.$state.toastMessage.message = message;
      this.$state.toastMessage.id = new Date().getTime();
      this.$state.toastMessage.style = style;
    }
  }
});