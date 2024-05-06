<template>
  <div class="logo" :class="{ 'logo--h': horizontal }">
    <template v-if="horizontal">
      <LOGOH />
      <LOGOH />
    </template>
    <template v-else>
      <LOGO />
      <LOGO />
    </template>
  </div>
</template>

<script setup lang="ts">
import LOGOH from '@/src/assets/img/icons/logo_h.svg'
import LOGO from '@/src/assets/img/icons/logo.svg'
defineProps({
  horizontal: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss">
@import '@/style/vars.scss';

.logo {
  position: relative;
  height: 100%;
  width: 100%;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;

    path {
      fill: white;
    }

    + svg {
      scale: 1.02;
      opacity: 1;
      filter: blur(5px);
      stroke: $dark-5;

      path {
        fill: $dark-5;
      }

      z-index: 1;
    }
  }

  &--h {
    svg + svg {
      scale: 1.05;
      opacity: 1;
      filter: blur(2px);
      z-index: 1;
    }
  }
}
</style>
