<template>
  <ul class="list-items">
    <ListItem v-for="(step, index) in routineSteps" :key="index" :step="step" :index="index" :is-first="index === 0"
      :is-last="index === routineSteps.length - 1" />
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

.card+.card {
  margin-top: $size-7;
}
</style>