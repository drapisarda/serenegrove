<template>
  <div class="steps-list">
    <ul>
      <StepItem v-for="(step, index) in stepsOptions" :key="index" :step="step" />
    </ul>
  </div>
</template>
  
<script lang="ts" setup>
import { useRoutineStore, } from "@/store/routine";
import { ref, watch } from "vue";

const { steps, stepsOptions, getRoutineSteps } =
  useRoutineStore();

const routineSteps = ref(getRoutineSteps());
watch(steps, (newSteps: number[]) => {
  routineSteps.value = getRoutineSteps()
})
</script>

<style lang="scss" scoped>
@import "@/style/vars.scss";

.steps-list {
  $root: &;
  position: relative;

  ul {
    list-style: none;
    
    display: grid;
    column-gap: $size-5;
    row-gap: $size-4;
    grid-template-columns: repeat(auto-fit, minmax(45%, 1fr));
  }
}
</style>