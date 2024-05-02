<template>
  <div class="steps-list">
    <ul>
      <StepItem v-for="(step, index) in stepsOptions" :key="index" :step="step" @add="add" />
    </ul>
  </div>
</template>
  
<script lang="ts" setup>
import { useRoutineStore } from "@/store/routine";
import { type Step, ToastStyles } from "@/store/types";
import { useGlobalStore } from "@/store/global";

import { ref, watch } from "vue";

const { steps, stepsOptions, getRoutineSteps, addStepAtTheBottom } =
  useRoutineStore();

const { setToastMessage } = useGlobalStore();

const add = (step: Step) => {
  addStepAtTheBottom(step);
  setToastMessage(`Step "${step.name}" added to the routine`, ToastStyles.Success);
}

const routineSteps = ref(getRoutineSteps());
watch(steps, (newSteps: number[]) => {
  routineSteps.value = getRoutineSteps()
})
</script>

<style lang="scss" >
@import "@/style/vars.scss";

.steps-list {
  $root: &;
  position: relative;

  ul {
    list-style: none;
    
    display: grid;
    padding: $size-7;
    column-gap: $size-6;
    row-gap: $size-3;
    grid-template-columns: repeat(auto-fit, 1fr);
    @media (min-width: $tablet) {
      grid-template-columns: repeat(auto-fit, minmax(45%, 1fr));
    }
  }
}
</style>