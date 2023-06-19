<template>
  <div class="steps-list container is-max-desktop">
    <ClientOnly>
      <template #fallback>
        <Loader />
      </template>
      <div class="steps-list__list steps-list__list--routine block">
        <ul>
          <li class="card" v-for="(step, index) in routineSteps" :key="index">
            <header class="card-header">
              <div class="card-image">
                <Icon :name="step.icon" />
              </div>
              <p class="card-header-title">
                {{ step.name }}
              </p>
              <button @click="() => moveStep(index, -1)" class="card-header-icon"
                :class="{ 'card-header-icon--inactive': index === 0 }" aria-label="move up">
                <UpShevron />
              </button>
              <button @click="() => moveStep(index, 1)" class="card-header-icon"
                :class="{ 'card-header-icon--inactive': index === steps.length - 1 }" aria-label="move down">
                <DownShevron />
              </button>
              <button class="card-header-icon" aria-label="remove element" @click="() => removeStep(step.name, index)">
                <Bin />
              </button>
            </header>
          </li>
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
              <li v-for="(step, index) in stepsOptions" :key="index">
                <div class="card">
                  <div class="card-image">
                    <Icon :name="step.icon" />
                  </div>
                  <header class="card-header">
                    <p class="card-header-title">
                      {{ step.name }}
                    </p>
                  </header>
                  <div class="card-content">
                    <div class="content">
                      <p>
                        {{ step.description }}
                      </p>
                    </div>
                  </div>
                  <div class="card-footer">
                    <button class="add-button button is-primary" aria-label="add element" @click="() => addStep(step)">
                      <Plus />
                      <span>
                        Add to your routine
                      </span>
                    </button>
                  </div>
                </div>
              </li>
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
import { useGlobalStore, ToastStyles } from "@/store/global";
import Plus from '@/src/assets/img/icons/plus.svg';
import Bin from '@/src/assets/img/icons/bin.svg';
import UpShevron from '@/src/assets/img/icons/up-chevron.svg';
import DownShevron from '@/src/assets/img/icons/down-chevron.svg';

import { ref, watch } from "vue";

const { setToastMessage } = useGlobalStore();

const { steps, stepsOptions, addStepAtTheBottom, removeStep: removeStepStore, moveStep, getRoutineSteps } =
  useRoutineStore();

const addStep = (step: Step) => {
  addStepAtTheBottom(step);
  setToastMessage(`Step "${step.name}" added to the routine`, ToastStyles.Success);
};

const removeStep = (name: string, index: number) => {
  removeStepStore(index);
  setToastMessage(`Step "${name}" removed from the routine`, ToastStyles.Warning);
}

let routineSteps = getRoutineSteps();
watch(steps, (newSteps: number[]) => {
  routineSteps = getRoutineSteps()
})
</script>

<style lang="scss" scoped>
@import "@/style/vars.scss";

.steps-list {
  $root: &;
  margin-top: $size-2;

  .modal {
    text-align: center;
    margin-top: $size-3;
  }

  ul {
    list-style: none;
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

    .card-header-icon {
      justify-content: space-around;
      flex: 0;
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