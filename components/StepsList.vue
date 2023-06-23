<template>
  <div class="steps-list container is-max-desktop">
    <ClientOnly>
      <template #fallback>
        <Loader />
      </template>
      <div class="steps-list__list steps-list__list--routine">
        <ul>
          <ListItem class="card" v-for="(step, index) in routineSteps" :key="index" :icon="step.icon"
            :itemName="step.name" :index="index" :is-first="index === 0" :is-last="index === routineSteps.length - 1" />
        </ul>
      </div>
      <Modal>
        <template v-slot:button-text>
          <Plus />
          Add steps to your routine
        </template>
        <template v-slot:modal-content>
          <h3 class="steps-list__modal-title"> Add steps to your routine </h3>
          <div class="steps-list__list steps-list__list--options">
            <p>
            <ul>
              <ListStepItem v-for="(step, index) in stepsOptions" :key="index" :step="step" />
            </ul>
            </p>
          </div>
        </template>
      </Modal>
    </ClientOnly>
  </div>
</template>
  
<script lang="ts" setup>
import { useRoutineStore, Step } from "@/store/routine";
import Plus from '@/src/assets/img/icons/plus.svg';
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
  margin-top: $size-2;
  overflow: hidden;
  position: relative;

  ul {
    list-style: none;
  }

  .modal {
    text-align: center;
    margin-top: $size-3;
  }

  &__list {
    overflow: visible;

    button svg {
      height: $listIconSize;
      width: $listIconSize;

      @media (min-width: $tablet) {
        height: $listIconSizeBig;
        width: $listIconSizeBig;
      }
    }
  }

  &__modal-title {
    color: $white;
  }

  &__list--options {
    padding-bottom: 6.5em;
    overflow: scroll;

    ul {
      display: grid;
      column-gap: $size-5;
      row-gap: $size-4;
      grid-template-columns: 100%;

      @media (min-width: $miniMobile) {
        grid-template-columns: repeat(auto-fit, minmax(calc(50% - #{$size-4*2}), 1fr));
      }

      @media (min-width: $tablet) {
        grid-template-columns: repeat(auto-fit, minmax(30%, 1fr));
        column-gap: $size-4;
      }
    }
  }
}
</style>