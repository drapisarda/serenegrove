<template>
  <div class="steps-list section">
    <div class="container">
      <div class="steps-list__list steps-list__list--routine block">
        <ul>
          <li class="card" :class="{ 'mb-4': index !== steps.length - 1 }" v-for="(step, index) in steps" :key="index">
            <header class="card-header">
              <p class="card-header-title">
                {{ step.name }} - {{ step.duration / 1000 }}s
              </p>
              <button @click="() => moveStep(index, -1)" class="card-header-icon"
                :class="{ 'card-header-icon--inactive': index === 0 }" aria-label="move up">
                <img src="/assets/img/icons/32/up-chevron.png" alt="Pause routine">
              </button>
              <button @click="() => moveStep(index, 1)" class="card-header-icon"
                :class="{ 'card-header-icon--inactive': index === steps.length - 1 }" aria-label="move down">
                <img src="/assets/img/icons/32/down-chevron.png" alt="Pause routine">
              </button>
              <button class="card-header-icon" aria-label="remove element" @click="() => removeStep(step.name, index)">
                <img src="/assets/img/icons/32/bin.png" alt="Pause routine">
              </button>
            </header>
          </li>
        </ul>
      </div>
      <div class="steps-list__add-button block">
        <button class="button is-large add-button" @click="toggleModal">
          <img src="/assets/img/icons/32/plus.png" alt="Add step to your routine">
          Add steps to your routine
        </button>
      </div>
      <div class="modal section" :class="{ 'is-active': modalIsOpen }">
        <div class="modal-background" @click="toggleModal"></div>
        <div class="modal-content">
          <div class="steps-list__list steps-list__list--options block">
            <h3 class="block is-size-3"> Add steps to your routine </h3>
            <p class="block">
            <ul>
              <li v-for="(step, index) in stepsOptions" :key="index">
                <div class="card" :class="{ 'mb-4': index !== stepsOptions.length - 1 }" @click="() => addStep(step)">
                  <div class="card-image">
                    <picture>
                      <source :srcset="`/assets/img/icons/512/${step.icon}`" media="(min-width: 512px)">
                      <img :src="`/assets/img/icons/128/${step.icon}`" :alt="`${step.name} - ${step.description}`">
                    </picture>
                  </div>
                  <header class="card-header">
                    <p class="card-header-title">
                      {{ step.name }} - {{ step.duration / 1000 }}s
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
                    <button class="card-header-icon add-button" aria-label="add element" @click="() => addStep(step)">
                      <img src="/assets/img/icons/32/plus.png" alt="Add step to your routine">
                      <span>
                        Add step to your routine
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
  </div>
</template>
  
  
<script lang="ts">
import { useRoutineStore, Step } from "@/store/routine";
import { useGlobalStore, ToastStyles } from "@/store/global";
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
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

    return {
      steps: steps as Step[],
      stepsOptions: stepsOptions as Step[],
      addStep,
      removeStep,
      moveStep,
      toggleModal,
      modalIsOpen
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/style/vars.scss";

.steps-list {
  ul {
    list-style: none;
  }

  &__list--options {
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
        padding: $size-6;
      }
    }

    .card-header-icon {
      flex: 0;
      justify-content: space-around;
    }

    ul {
      display: grid;
      column-gap: $size-4;
      row-gap: $size-4;
      grid-template-columns: repeat(auto-fit, minmax($tablet/4, 1fr));

      @media (min-width: 600px) {
        grid-template-columns: repeat(auto-fit, minmax(30%, 1fr));
      }
    }

    .card-footer {
      flex: 1;
      button {
      flex-basis: 100%;
      padding-left: $size-7;
      padding-right: $size-7;
      width: 100%;
    }
    }
  }

  .card-header-icon--inactive {
    opacity: 0.3;
    pointer-events: none;
  }

  &__add-button button {
    width: 100%;
    span{
      margin-right: $size-7;
    }
  }

  .add-button {
    background-color: $success;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      filter: invert(100%) brightness(2);
      margin-right: 0.5em;
    }
  }
}
</style>