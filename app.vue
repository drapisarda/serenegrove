<template>
  <header v-if="showHeader" class="block">
    <Navigation />
  </header>
  <NuxtPage />
  <Footer />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
const showHeader = useRoute().path !== '/';


</script>
<style lang="scss">
@import "@/style/main.scss";
</style>