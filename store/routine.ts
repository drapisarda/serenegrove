import { defineStore } from "pinia";

import { useGlobalStore } from "./global";

export interface Step {
  name: string,
  duration: number,
  file: string,
  description: string,
  icon: string,
}

export const useRoutineStore = defineStore("mainRoutine", {
  state: () => ({
    steps: [] as Step[],
    lastEdit: 0 as number,
    version: useGlobalStore().getVersion() as string,
    stepsOptions: [
      { name: 'breath', duration: 3000, file: '@/assets/audio/1.mp3', description: 'lorem ipsum dolor sit amet', icon: '005-breath.png' },
      { name: 'body scan', duration: 5000, file: '@/assets/audio/2.mp3', description: 'lorem ipsum dolor sit amet', icon: '003-meditation.png' },
      { name: 'sounds', duration: 7000, file: '@/assets/audio/3.mp3', description: 'lorem ipsum dolor sit amet', icon: '004-landscape.png' },
      { name: 'mantra', duration: 5000, file: '@/assets/audio/4.mp3', description: 'lorem ipsum dolor sit amet', icon: '002-shree.png' },
      { name: 'bell', duration: 3000, file: '@/assets/audio/5.mp3', description: 'lorem ipsum dolor sit amet', icon: '001-standing-bell.png' },
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
    moveStep(stepIndex: number, amount: number) {
      const newIndex = (stepIndex + amount);
      if (newIndex < 0 || newIndex >= this.$state.steps.length) return;
      const element = this.$state.steps[stepIndex];
      this.$state.steps.splice(stepIndex, 1);
      this.$state.steps.splice(newIndex, 0, element);
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
