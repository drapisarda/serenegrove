<template>
  <div class="steps-list">
    <div class="tile is-ancestor">
      <div class="steps-list__list steps-list__list--options tile is-6 is-parent">
        <ul>
          <li class="card mb-4" v-for="value in stepsOptions" @click="() => addStepAtTheBottom(value)">
            <header class="card-header">
              <p class="card-header-title">
                {{ value }}
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
          <li class="card mb-4" v-for="(value, index) in steps" @click="() => removeStep(index)">
            <header class="card-header">
              <p class="card-header-title">
                {{ value }}
              </p>
              <button class="card-header-icon" aria-label="remove element">
                ➖
              </button>
            </header>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
  
  
<script lang="ts">
import { useRoutineStore } from '@/store/routine';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const { steps, stepsOptions, addStepAtTheBottom, removeStep } = useRoutineStore();
    return {
      steps,
      stepsOptions,
      addStepAtTheBottom,
      removeStep,
    }
  },
})

</script>

<style lang="scss" scoped>
.steps-list {
  ul {
    flex: 1;
    list-style: none;
  }
}
</style>