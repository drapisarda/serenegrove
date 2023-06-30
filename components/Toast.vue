<template>
  <div class="toast" :class="{ 'toast--visible': isVisible, [messageClass]: true }">
    <slot>
      <p>
        {{ message }}
      </p>
    </slot>
  </div>
</template>

<script lang="ts" setup>
import { useGlobalStore, ToastMessage } from "@/store/global";
import { ref, watch } from "vue";

const message = ref('');
const messageClass = ref('');
const isVisible = ref(false);
const { toastMessage } = useGlobalStore();
watch(toastMessage, (newMessage: ToastMessage) => displayMessage(newMessage));
let displayInterval: NodeJS.Timeout | undefined;

const displayMessage = (newMessage: ToastMessage, duration: number = 3000) => {
  if (displayInterval) {
    isVisible.value = false;
    clearInterval(displayInterval);
    displayInterval = undefined;
  }

  message.value = newMessage.message;
  messageClass.value = `is-${newMessage.style ? newMessage.style : 'is-primary'}`;
  isVisible.value = true;
  displayInterval = setTimeout(function () { isVisible.value = false; }, duration);
}
</script>

<style scoped lang="scss">
@import "@/style/vars.scss";
$spacing: 0;

.toast {
  position: fixed;
  width: 100%;
  bottom: $spacing;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s .1s;
  padding: $size-6 $size-4;
  background-color: $dark-1;
  z-index: $toastZIndex;

  &.is-success {
    background-color: $success;
  }
  &.is-warning {
    background-color: $clear-3;
    color: $dark-5;
  }

  &.toast--visible {
    z-index: $toastZIndex;
    opacity: 1;
    pointer-events: all;
  }
}
</style>