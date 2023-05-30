<template>
  <div class="logo" :class="{ 'logo--h': horizontal }">
    <template v-if="horizontal">
      <LOGOH />
      <LOGOH />
    </template>
    <template v-else>
      <LOGO v-if="!horizontal" />
      <LOGO v-if="!horizontal" />
    </template>
  </div>
</template>

<script setup lang="ts">
import LOGOH from '@/public/assets/img/icons/logo_h.svg?component';
import LOGO from '@/public/assets/img/icons/logo.svg?component';
const props = defineProps(['horizontal']);
</script>

<style lang="scss">
@import "@/style/vars.scss";

.logo {
  position: relative;
  height: 100%;
  width: 100%;
  max-height: 300px;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    position: absolute;
    max-width: 100%;
    max-height: 100%;
    z-index: 2;

    path {
      fill: white;
    }

    +svg {
      scale: 1.02;
      opacity: 1;
      filter: blur(5px);

      path {
        fill: $dark-1;
      }

      z-index: 1;
    }

  }

  &--h {
    svg+svg {
      scale: 1.05;
      opacity: 1;
      filter: blur(2px);
      z-index: 1;
    }
  }
}
</style>