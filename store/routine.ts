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
      { name: 'Breath', duration: 3000, file: '/assets/audio/1.mp3', description: 'Focus your attention on the sensation of the breath, observing its natural flow without trying to control it.', icon: '005-breath.png' },
      { name: 'Body scan', duration: 5000, file: '/assets/audio/2.mp3', description: 'Systematically bring awareness to different parts of the body, observing physical sensations without judgment.', icon: '003-meditation.png' },
      { name: 'Sounds around you', duration: 7000, file: '/assets/audio/3.mp3', description: 'Direct your attention to the sounds in your environment, observing them as they arise and fade away without analysis.', icon: '004-landscape.png' },
      { name: 'Mantra', duration: 5000, file: '/assets/audio/4.mp3', description: 'Repeat a chosen word or phrase silently in your mind to cultivate inner calm and focused awareness.', icon: '002-shree.png' },
      { name: 'Bell sound', duration: 3000, file: '/assets/audio/5.mp3', description: 'Focus your attention on the sound of a bell, observing its duration, resonance, and fading away to develop concentration.', icon: '001-standing-bell.png' },
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
