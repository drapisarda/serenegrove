<template>
  <header v-if="showHeader">
    <Navigation />
  </header>
  <div class="page-content">
    <NuxtPage />
  </div>
  <Footer />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
const showHeader = useRoute().path !== '/';


</script>
<style lang="scss">
@import "@/style/main.scss";
</style>