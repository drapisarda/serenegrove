<template>
  <div class="steps-list container section is-max-desktop">
    <div class="steps-list__list steps-list__list--routine block">
      <ul>
        <li class="card" :class="{ 'mb-4': index !== steps.length - 1 }" v-for="(step, index) in steps" :key="index">
          <header class="card-header">
            <div class="card-image">
              <img :src="step.icon" :alt="`${step.name} - ${step.description.substring(0, 15)}...`">
            </div>
            <p class="card-header-title">
              {{ step.name }}
            </p>
            <button @click="() => moveStep(index, -1)" class="card-header-icon"
              :class="{ 'card-header-icon--inactive': index === 0 }" aria-label="move up">
              <img src="/assets/img/icons/up-chevron.svg" alt="Pause routine">
            </button>
            <button @click="() => moveStep(index, 1)" class="card-header-icon"
              :class="{ 'card-header-icon--inactive': index === steps.length - 1 }" aria-label="move down">
              <img src="/assets/img/icons/down-chevron.svg" alt="Pause routine">
            </button>
            <button class="card-header-icon" aria-label="remove element" @click="() => removeStep(step.name, index)">
              <img src="/assets/img/icons/bin.svg" alt="Pause routine">
            </button>
          </header>
        </li>
      </ul>
    </div>
    <div class="steps-list__add-button block">
      <button class="button is-large add-button is-primary" @click="toggleModal">
        <Plus />
        Add steps to your routine
      </button>
    </div>
    <div class="modal" :class="{ 'is-active': modalIsOpen }">
      <div class="modal-background" @click="toggleModal"></div>
      <div class="modal-close" @click="toggleModal"></div>
      <div class="modal-content section">
        <h3 class="block is-size-3"> Add steps to your routine </h3>
        <div class="steps-list__list steps-list__list--options">
          <p class="block">
          <ul>
            <li v-for="(step, index) in stepsOptions" :key="index">
              <div class="card" :class="{ 'mb-4': index !== stepsOptions.length - 1 }">
                <div class="card-image">
                  <img :src="step.icon" :alt="`${step.name} - ${step.description.substring(0, 15)}...`">
                </div>
                <header class="card-header">
                  <p class="card-header-title">
                    {{ step.name }}
                    <!-- - {{ step.duration / 1000 }}s -->
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
                  <button class="add-button button is-primary" aria-label="add element"
                    @click="() => addStep(step)">
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
      </div>
    </div>
  </div>
</template>
  
  
<script lang="ts" setup>
import { useRoutineStore, Step } from "@/store/routine";
import { useGlobalStore, ToastStyles } from "@/store/global";
import Plus from '@/public/assets/img/icons/plus.svg';
import { ref } from "vue";
let modalIsOpen = ref(false);
const toggleModal = () => {
  modalIsOpen.value = !modalIsOpen.value;
};
const { setToastMessage } = useGlobalStore();

const { steps, stepsOptions, addStepAtTheBottom, removeStep: removeStepStore, moveStep } =
  useRoutineStore();

const addStep = (step: Step) => {
  setToastMessage(`step ${step.name} added to the routine`, ToastStyles.Success);
  addStepAtTheBottom(step);
};

const removeStep = (name: string, index: number) => {
  removeStepStore(index);
  setToastMessage(`step ${name} removed from the routine`, ToastStyles.Warning);
}
</script>

<style lang="scss">
@import "@/style/vars.scss";

.steps-list {
  $root: &;

  ul {
    list-style: none;
  }

  &__list {
    .card-image {
      padding: $size-6;
      flex-shrink: 0;

      img {
        height: $size-1;
      }
    }

    .card-header-title {
      font-size: clamp(0.7em, 5vw, 1em);
    }

    button img {
      height: 24px;
      width: 24px;

      @media (min-width: $tablet) {
        height: 32px;
        width: 32px;
      }
    }

    .card-header-icon {
      flex-shrink: 0;
    }
  }

  &__list--options {
    padding-bottom: 6.5em;

    .card {
      text-align: left;
      padding: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .card-image {
      text-align: center;

      img {
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
      column-gap: $size-4;
      row-gap: $size-4;
      grid-template-columns: repeat(auto-fit, minmax(calc(#{$tablet}/4), 1fr));

      @media (min-width: $tablet) {
        grid-template-columns: repeat(auto-fit, minmax(30%, 1fr));
      }
    }

    .card-content {
      padding: $size-7;
      flex: 1;
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

  &__add-button button {
    margin: auto;

    span {
      margin-right: $size-7;
    }
  }

  .add-button {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    max-height: initial;

    #{$root}__list {
      max-height: 100%;
      overflow: scroll;
      flex: 1;
    }
  }
}
</style>