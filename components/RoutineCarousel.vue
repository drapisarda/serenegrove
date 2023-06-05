<template>
  <div class="routine-carousel" v-if="currentStepIndex > -1">
    <ul class="columns is-mobile">
      <li class="column" v-for="(step, index) in carouselSteps" :key="index" :class="{ 'is-6': index === 1 }">
        <img v-if="step" :src="step.icon" :alt="`${step.name} - ${step.description.substring(0, 15)}...`">
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
.routine-carousel {
  .columns {
    margin: auto;
  }

  .column {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      height: 170px;
      opacity: 0.5;
      filter: invert(100%);
      transform: scale(0.5);
    }

    &:nth-child(2) {
      img {
        opacity: 1;
        transform: scale(1);
        animation: pulse 3s linear infinite;

        .player__playing--paused & {
          animation: none;
        }
      }


      @keyframes pulse {
        0% {
          transform: scale(1);
        }

        20% {
          transform: scale(1.2);
        }


        90% {
          transform: scale(0.9);
        }

        100% {
          transform: scale(1);
        }
      }
    }
  }
}
</style>