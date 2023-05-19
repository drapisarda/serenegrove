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
                ⬆️
              </button>
              <button @click="() => moveStep(index, 1)" class="card-header-icon"
                :class="{ 'card-header-icon--inactive': index === steps.length - 1 }" aria-label="move down">
                ⬇️
              </button>
              <button class="card-header-icon" aria-label="remove element" @click="() => removeStep(step.name, index)">
                🗑
              </button>
            </header>
          </li>
        </ul>
      </div>
      <div class="steps-list__add-button block">
        <button class="button is-large" @click="toggleModal">
          <span>➕</span>
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
                <button class="card" :class="{ 'mb-4': index !== stepsOptions.length - 1 }" @click="() => addStep(step)">
                  <header class="card-header">
                    <p class="card-header-title">
                      {{ step.name }} - {{ step.duration / 1000 }}s
                    </p>
                    <button class="card-header-icon" aria-label="add element">
                      ➕
                    </button>
                  </header>
                  <div class="card-content">
                    <div class="content">
                      <p>
                        {{ step.description }}
                      </p>
                    </div>
                  </div>
                </button>
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
    button.card {
      text-align: left;
      padding: 0;

      cursor: pointer;
      width: 100%;
    }

    .card-header-icon {
      flex: 0;
    }

    ul {
      display: grid;
      column-gap: $size-4;
      grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) );
    }
  }

  .card-header-icon--inactive {
    filter: saturate(0);
    pointer-events: none;
  }

  &__add-button button {
    width: 100%;
    background-color: $success;

    span {
      filter: invert(100%) brightness(2);
    }
  }
}
</style>