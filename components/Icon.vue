<template>
  <component :is="icon" />
</template>

<script setup>
import * as icons from "@/src/assets/img/icons/index.ts";

const props = defineProps(["name"]);
const icon = computed(() => icons[props.name]);
</script>