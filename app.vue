<template>
  <NuxtLoadingIndicator :color="'#FEF8C6'" :height="5" :throttle="5000" />
  <NuxtLayout>
    <NuxtPage />
    <SpeedInsights />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { useRoutineStore } from '@/store/routine'
import { useGlobalStore } from '@/store/global'
import { SpeedInsights } from '@vercel/speed-insights/nuxt'

const { version } = useRoutineStore()
const { version: globalVersion } = useGlobalStore()
if (version !== globalVersion) useRoutineStore().$reset()
</script>

<style lang="scss">
@import '@/style/main.scss';
</style>
