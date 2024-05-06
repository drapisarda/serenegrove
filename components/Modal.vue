<template>
  <div class="modal" role="button" tabindex="0" @keyup="handleKeys">
    <div class="modal__button">
      <button class="button is-primary" @click="openModal">
        <slot name="button-text">Open Modal</slot>
      </button>
    </div>
    <dialog :open="modalStatus" class="modal__dialog">
      <button class="modal__close" @click="closeModal">X</button>
      <slot name="modal-title" class="section" />
      <div class="modal__content">
        <slot name="modal-content" class="section" />
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { clipHtml } from '@/composables/clipHtml'

const modalStatus = ref(false)
clipHtml(modalStatus)

const handleKeys = (event: KeyboardEvent) => {
  if (event.key === 'Escape') closeModal()
}

const openModal = () => {
  modalStatus.value = true
}

const closeModal = () => {
  modalStatus.value = false
}
</script>

<style lang="scss">
@import '@/style/vars.scss';
.modal {
  &__dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100svh;
    z-index: $modalZIndex;
    margin: 0;
    background-color: rgba(0, 0, 0, 0.8);
    /* background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab); */
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    opacity: 0;
    transition: opacity 1s ease-in-out;
    pointer-events: none;

    &[open] {
      opacity: 1;
      pointer-events: all;
    }
  }

  &__close {
    position: absolute;
    color: $white;
    top: 20px;
    right: 30px;
    background: transparent;
    border: none;
    font-size: 1.5em;
    cursor: pointer;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
  }

  &__dialog {
    color: $white;
    border: none;
  }

  &__content {
    overflow: scroll;
  }
}
</style>
