<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { useRoutineStore } from "@/store/routine";
import { useGlobalStore } from "@/store/global";

const { version } = useRoutineStore();
const { version: globalVersion } = useGlobalStore();
if (version !== globalVersion) useRoutineStore().$reset();
</script>

<style lang="scss">
@import "@/style/main.scss";
</style>