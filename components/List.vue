<template>
  <div class="steps-list block">
    <div class="container">
      <div class="tile">
        <div class="steps-list__list steps-list__list--options tile is-6 is-parent">
          <ul>
            <li class="card mb-4" v-for="(value, index) in stepsOptions" :key="index"
              @click="() => addStepAtTheBottom(value)">
              <header class="card-header">
                <p class="card-header-title">
                  {{ value.name }} - {{ value.duration / 1000 }}s
                </p>
                <button class="card-header-icon" aria-label="add element">
                  ➕
                </button>
              </header>
            </li>
          </ul>
        </div>
        <div class="steps-list__list steps-list__list--choices tile is-6 is-parent">
          <ul>
            <li class="card mb-4" v-for="(value, index) in steps" :key="index">
              <header class="card-header">
                <p class="card-header-title">
                  {{ value.name }} - {{ value.duration / 1000 }}s
                </p>
                <button @click="() => moveStep(index, -1)" class="card-header-icon"
                  :class="{ 'card-header-icon--inactive': index === 0 }" aria-label="move up">
                  ⬆️
                </button>
                <button @click="() => moveStep(index, 1)" class="card-header-icon"
                  :class="{ 'card-header-icon--inactive': index === steps.length-1 }" aria-label="move down">
                  ⬇️
                </button>
                <button class="card-header-icon" aria-label="remove element" @click="() => removeStep(index)">
                  ➖
                </button>
              </header>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
  
  
<script lang="ts">
import { useRoutineStore, Step } from "@/store/routine";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const { steps, stepsOptions, addStepAtTheBottom, removeStep, moveStep } =
      useRoutineStore();
    return {
      steps: steps as Step[],
      stepsOptions: stepsOptions as Step[],
      addStepAtTheBottom,
      removeStep,
      moveStep
    };
  },
});
</script>

<style lang="scss" scoped>
.steps-list {
  ul {
    flex: 1;
    list-style: none;
  }

  .card-header-icon--inactive {
    filter: saturate(0);
    pointer-events: none;
  }
}
</style>