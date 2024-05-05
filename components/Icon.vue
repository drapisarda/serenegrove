<template>
  <component :is="icon" />
</template>

<script setup>
import * as icons from '@/src/assets/img/icons/index.ts'
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})
const icon = computed(() => icons[props.name])
</script>
