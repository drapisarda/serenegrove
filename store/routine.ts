import { defineStore } from "pinia";

export const useRoutineStore = defineStore("mainRoutine", {
  state: () => ({
    steps: [] as string[],
    lastEdit: "",
    stepsOptions: [
      'lol',
      'lal',
      'lel'
    ],
  }),
  actions: {
    addStep(step: string, index: number) {
      console.log('add to ' + this.$state.steps);
      this.$state.steps.splice(index, 0, step);
    },
    addStepAtTheBottom(step: string) {
      console.log('add at the bottom of ' + this.$state.steps);
      this.$state.steps.push(step);
    },
    removeStep(index: number) {
      console.log('remove from ' + this.$state.steps);
      if (index < 0 ) return;
      this.$state.steps.splice(index, 1)
    }
  },
});