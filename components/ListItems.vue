<template>
  <ul class="list-items">
    <ListItem class="card" v-for="(step, index) in routineSteps" :key="index" :icon="step.icon" :itemName="step.name"
      :index="index" :is-first="index === 0" :is-last="index === routineSteps.length - 1" />
  </ul>
</template>

<script lang="ts" setup>
import { useRoutineStore, } from "@/store/routine";
import { ref, watch } from "vue";

const { steps, getRoutineSteps } =
  useRoutineStore();

const routineSteps = ref(getRoutineSteps());
watch(steps, (newSteps: number[]) => {
  routineSteps.value = getRoutineSteps()
})
</script>

<style lang="scss" scoped>
@import "@/style/vars.scss";

</style>