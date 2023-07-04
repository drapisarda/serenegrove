<template>
  <div class="fixed-container">
    <Navigation />
    <div class="fixed-container__content">
      <slot />
    </div>
    <Toast />
  </div>
</template>

<style lang="scss">
.fixed-container {
  overflow: hidden;
  height: 100vh;
  display: flex;
  flex-direction: column;
  &__content {
    flex: 1;
    position: relative;
  }
}
</style>