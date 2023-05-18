import { defineStore } from "pinia";

export interface ToastMessage {
  message: string,
  id: number,
  style: string
}

export enum ToastStyles {
  Success = 'success',
  Warning = 'warning',
}

export const useGlobalStore = defineStore("global", {
  state: () => ({
    version: '0.1' as string,
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