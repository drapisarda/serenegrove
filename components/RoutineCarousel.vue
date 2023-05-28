<template>
  <div class="routine-carousel">
    <ul class="columns">
      <li class="column" v-for="step in carouselSteps">
        <img v-if="step" :src="step.url" :alt="step.altDescription">
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useRoutineStore, Step, StepIconData } from "@/store/routine";
const { playerSteps, stepIconsDataMap } = useRoutineStore();
const props = defineProps(['currentStepIndex']);


const getStepIconData = (stepIndex: number): StepIconData | undefined => {
  const step = playerSteps[stepIndex];
  if (!step) return;

  return stepIconsDataMap.get(step.name);
}

const currentStepIconData = computed((): StepIconData | undefined => {
  return getStepIconData(props.currentStepIndex);
});
const previousStepIconData = computed((): StepIconData | undefined => {
  return getStepIconData(props.currentStepIndex - 1);
});
const nextStepIconData = computed((): StepIconData | undefined => {
  return getStepIconData(props.currentStepIndex + 1);
});

const carouselSteps = computed((): (StepIconData | undefined)[] => [
  previousStepIconData.value,
  currentStepIconData.value,
  nextStepIconData.value,
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
    align-items: baseline;

    img {
      width: 100%;
      max-height: 100%;
      max-width: 100%;
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