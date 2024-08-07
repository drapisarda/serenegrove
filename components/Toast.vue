<template>
  <div
    class="toast"
    :class="{ 'toast--visible': isVisible, [messageClass]: true }"
  >
    <slot>
      <div class="toast__content">
        {{ message }}
      </div>
    </slot>
  </div>
</template>

<script lang="ts" setup>
import { useGlobalStore } from '@/store/global'
import { ref, watch } from 'vue'
import type { ToastMessage } from '@/store/types'

const message = ref('')
const messageClass = ref('')
const isVisible = ref(false)
const { toastMessage } = useGlobalStore()
watch(toastMessage, (newMessage: ToastMessage) => displayMessage(newMessage))
let displayInterval: number | undefined

const displayMessage = (newMessage: ToastMessage, duration: number = 2000) => {
  if (!window) return
  isVisible.value = false

  if (displayInterval) clearInterval(displayInterval)

  message.value = newMessage.message
  messageClass.value = `is-${newMessage.style}`
  isVisible.value = true

  displayInterval = window.setTimeout(function () {
    isVisible.value = false
  }, duration)
}
</script>

<style lang="scss">
@import '@/style/vars.scss';

.toast {
  position: fixed;
  width: 100%;
  top: 0;
  opacity: 0;
  transform: translate(0, -120%);
  pointer-events: none;
  transition: all 0.5s 0.1s;
  z-index: $toastZIndex;
  height: $barHeight;
  text-align: center;

  &__content {
    padding: $size-6 $size-4;
    background-color: $dark-1;
    display: inline-flex;
    margin-top: $size-7;
    border-radius: $size-8;

    .is-success & {
      background-color: $success;
    }

    .is-warning & {
      background-color: $clear-3;
      color: $dark-5;
    }
  }

  &.toast--visible {
    z-index: $toastZIndex;
    pointer-events: all;
    animation: fadeInOut 3s;
    opacity: 1;
    transform: translate(0, 0);
  }

  @keyframes fadeInOut {
    from {
      opacity: 0;
      transform: translate(0, -120%);
    }

    20% {
      opacity: 1;
      transform: translate(0, 0);
    }

    80% {
      opacity: 1;
      transform: translate(0, 0);
    }

    to {
      opacity: 0;
      transform: translate(0, -120%);
    }
  }
}
</style>
