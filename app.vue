<template>
  <header v-if="showHeader">
    <Navigation />
  </header>
  <div class="page-content">
    <NuxtPage />
  </div>
  <Footer />
  <Toast />
</template>

<script lang="ts" setup>
import { useRoutineStore } from "@/store/routine";
import { useGlobalStore } from "@/store/global";

const { version } = useRoutineStore();
const { version: globalVersion } = useGlobalStore();
if (version !== globalVersion) useRoutineStore().$reset();

const showHeader = useRoute().path !== '/';
</script>

<style lang="scss">
@import "@/style/main.scss";
</style>