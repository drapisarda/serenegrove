<template>
  <div class="toast" :class="{'toast--visible': isVisible}">
    <slot>
      <div class="notification" :class="messageClass">
        <p>
          {{ message }}
        </p>
      </div>
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

const displayMessage = (newMessage: ToastMessage, duration = 3000) => {
  isVisible.value = true;
  message.value = newMessage.message;
  messageClass.value = `is-${newMessage.style ? newMessage.style : 'success'}`;
  setTimeout(function () { isVisible.value = false }, duration);
}
</script>

<style scoped lang="scss">
@import "@/style/vars.scss";
$spacing: 3rem;

.toast {
  position: fixed;
  width: 100%;
  bottom: $spacing;
  visibility: hidden;

  &.toast--visible {
    z-index: $toastZIndex;
    visibility: visible;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
  }

  @keyframes fadein {
    from {
      bottom: 0;
      opacity: 0;
    }

    to {
      bottom: $spacing;
      opacity: 1;
    }
  }

  @keyframes fadeout {
    from {
      bottom: $spacing;
      opacity: 1;
    }

    to {
      bottom: 0;
      opacity: 0;
    }
  }
}
</style>