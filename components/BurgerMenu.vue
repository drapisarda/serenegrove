<template>
  <button @click="toggleMenu" class="burger-menu">
    &#9776; <!-- This is a simple text representation of a burger menu icon -->
  </button>
  <transition name="slide">
    <div v-if="showMenu" class="sidebar">
      <button @click="toggleMenu" class="close-button">
        &times; <!-- This is a simple text representation of a close icon -->
      </button>
      <!-- Menu Items -->
      <Slot/>
    </div>
  </transition>
  <slot />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const showMenu = ref(false)
const toggleMenu = () => {
  showMenu.value = !showMenu.value
}
</script>

<style scoped lang="scss">
@import "@/style/vars.scss";
.container {
  position: relative;
}

.burger-menu {
  position: absolute;
  right: 10px;
  top: 10px;
}

.sidebar {
  position: absolute;
  right: 0;
  top: 0;
  width: 200px;
  height: 100%;
  background: #f3f3f3;
  overflow: auto;
  z-index: $sidebarMenuZIndex;
}

.close-button {
  position: absolute;
  right: 10px;
  top: 10px;
}

/* Transition Styles */
.slide-enter-active {
  animation: slide-in 0.5s ease-in-out forwards;
}

.slide-leave-active {
  animation: slide-out 0.5s ease-in-out forwards;
}

@keyframes slide-in {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(0);
  }
}

@keyframes slide-out {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(100%);
  }
}
</style>
