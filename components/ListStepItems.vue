<template>
  <div class="steps-list">
    <ul>
      <StepItem
        v-for="(step, index) in stepsOptions"
        :key="index"
        :step="step"
        @add="add(step)"
      />
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useRoutineStore } from '@/store/routine'
import { type Step, ToastStyles } from '@/store/types'
import { useGlobalStore } from '@/store/global'
import StepItem from '@/components/StepItem.vue'

const { stepsOptions, addStepAtTheBottom } = useRoutineStore()

const { setToastMessage } = useGlobalStore()

const add = (step: Step) => {
  addStepAtTheBottom(step)
  setToastMessage(
    `Step "${step.name}" added to the routine`,
    ToastStyles.Success,
  )
}
</script>

<style lang="scss">
@import '@/style/vars.scss';

.steps-list {
  $root: &;
  position: relative;
  padding-top: $size-7;
  padding-bottom: $size-7;

  ul {
    list-style: none;
    display: grid;
    padding: $size-8;
    column-gap: $size-6;
    row-gap: $size-6;
    grid-template-columns: repeat(auto-fit, 1fr);

    @media (min-width: $desktop) {
      row-gap: $size-3;
      grid-template-columns: repeat(auto-fit, minmax(45%, 1fr));
    }
  }
}
</style>
