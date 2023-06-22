<template>
  <div class="routine-carousel">
    <ul class="row">
      <li v-for="(step, index) in carouselSteps" :key="index"
        :class="{ 'col-xs-6': index === 1, 'col-xs-3': index !== 1 }">
        <Icon v-if="step" :name="step.icon" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { Step } from "@/store/routine";
const props = defineProps(['currentStepIndex', 'playerSteps']);

const currentStep = computed((): Step | undefined => {
  return props.playerSteps[props.currentStepIndex];
});
const previousStep = computed((): Step | undefined => {
  return props.playerSteps[props.currentStepIndex - 1];
});
const nextStep = computed((): Step | undefined => {
  return props.playerSteps[props.currentStepIndex + 1];
});

const carouselSteps = computed((): (Step | undefined)[] => [
  previousStep.value,
  currentStep.value,
  nextStep.value,
])
</script>

<style lang="scss">
@import "@/style/vars.scss";

.routine-carousel {
  .row {
    margin: auto;
    width: 100%;
    height: 100%;
  }

  .row > li {
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      height: 100%;
      width: 100%;
      opacity: 0.5;
      fill: $clear-1;
      transform: scale(0.3);
    }

    &:nth-child(2) {
      svg {
        opacity: 1;
        transform: scale(0.8);
        animation: pulse 10s ease-in-out infinite;

        .player__playing--paused & {
          animation: none;
        }
      }


      @keyframes pulse {
        0% {
          transform: scale(0.8);
        }

        50% {
          transform: scale(1);
        }

        100% {
          transform: scale(0.8);
        }
      }
    }
  }
}
</style>