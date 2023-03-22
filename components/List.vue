<template>
  <div>
    <h1>
      add or remove
    </h1>
    <ul>
      <li v-for="value in stepsOptions" @click="() => addStepAtTheBottom(value)"> ➕ {{ value }}</li>
    </ul>
    <ul>
      <li v-for="(value, index) in steps" @click="() => removeStep(index)">
        ➖ {{ value }}
      </li>
    </ul>

  </div>
</template>
  
  
<script lang="ts">
import { useRoutineStore } from '@/store/routine';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const {steps, stepsOptions, addStepAtTheBottom, removeStep} = useRoutineStore();
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
ul {
  list-style: none;
}
</style>