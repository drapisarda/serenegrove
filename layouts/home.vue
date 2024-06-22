<template>
  <div class="page-content">
    <slot />
  </div>
  <Footer />
</template>

<script lang="ts" setup>
const route = useRoute()
useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: 'https://www.serenegrove.com' + route.path,
    },
  ],
}))
</script>
