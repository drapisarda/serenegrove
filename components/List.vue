<template>
  <div class="steps-list container is-max-desktop">
    <ClientOnly>
      <template #fallback>
        <Loader />
      </template>
      <div class="steps-list__list steps-list__list--routine block">
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
              <ListStep v-for="(step, index) in stepsOptions" :key="index" :step="step" />
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

  ul {
    list-style: none;
  }

  .modal {
    text-align: center;
    margin-top: $size-3;
  }

  &__list {
    overflow: visible;

    .card-image {
      padding: $size-7;
      flex-shrink: 0;
      display: none;

      @media (min-width: $miniMobile) {
        display: flex;
        align-items: center;
      }

      @media (min-width: $tablet) {
        padding: $size-6;
      }

      svg {
        width: auto;
        height: $size-3;

        @media (min-width: $tablet) {
          height: $size-2;
        }
      }
    }

    .card-header-title {
      font-size: clamp(1rem, 3vw, 1.6rem);
      padding: calc($size-7/2) $size-7;
      margin-bottom: 0;
      white-space: nowrap;
      overflow: hidden;
    }

    button svg {
      height: 24px;
      width: 24px;

      @media (min-width: $tablet) {
        height: 32px;
        width: 32px;
      }
    }

    .card-header {
      display: flex;
      background-color: $clear-1;

      button {
        border: none;
        background: transparent;
      }
    }

    .card-header-title {
      flex: 1;
      display: flex;
      align-items: center;
    }

    .card-header-icon {
      flex-shrink: 0;
    }
  }

  &__modal-title {
    color: $white;
  }

  &__list--options {
    padding-bottom: 6.5em;
    overflow: scroll;

    .card {
      text-align: left;
      padding: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      margin-bottom: $size-3;
      background-color: $white;
    }

    .card-image {
      text-align: center;
      display: block;

      svg {
        height: 100px;

        @media (min-width: $desktop) {
          height: 130px;
        }
      }
    }

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

    .card-content {
      flex: 1;
      padding: calc($size-7/2) $size-7;
    }

    button {
      flex-basis: 100%;
      padding-left: $size-7;
      padding-right: $size-7;
      width: 100%;
      padding-top: $size-5;
      padding-bottom: $size-5;
      border-radius: 0;
      height: auto;
      max-height: none;

      @media (min-width: $tablet) {
        padding-top: $size-7;
        padding-bottom: $size-7;
      }
    }
  }

  .card-header-icon--inactive {
    opacity: 0.3;
    pointer-events: none;
  }

  .add-button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>