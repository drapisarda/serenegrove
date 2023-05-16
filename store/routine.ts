import { defineStore } from "pinia";

import { useVersionStore } from "./version";

export interface Step {
  name: string,
  duration: number,
  file: string,
}

export const useRoutineStore = defineStore("mainRoutine", {
  state: () => ({
    steps: [] as Step[],
    lastEdit: 0 as number,
    version: useVersionStore().getVersion() as string,
    stepsOptions: [
      { name: 'breath', duration: 3000, file: '../audio/1.mp3' },
      { name: 'body scan', duration: 5000, file: '../audio/2.mp3' },
      { name: 'sounds', duration: 7000, file: '../audio/3.mp3' },
      { name: 'mantra', duration: 5000, file: '../audio/4.mp3' },
      { name: 'bell', duration: 3000, file: '../audio/5.mp3' },
    ] as Step[],
  }),
  actions: {
    addStep(step: Step, insertIndex: number) {
      console.log(`add ${insertIndex}`);
      this.$state.steps.splice(insertIndex, 0, step);
      this.lastEdit = Date.now();
    },
    addStepAtTheBottom(step: Step) {
      console.log('add at the bottom');
      this.$state.steps.push(step);
      this.lastEdit = Date.now();
    },
    removeStep(removeIndex: number) {
      console.log(`remove ${removeIndex}`);
      if (removeIndex < 0) return;
      this.$state.steps.splice(removeIndex, 1);
      this.lastEdit = Date.now();
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
