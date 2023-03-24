import { defineStore } from "pinia";

import { useVersionStore } from "./version";

export interface Step {
  name: string,
  duration: number,
  file: string,
} 

export const useRoutineStore = defineStore("mainRoutine", {
  state: () => ({
    steps: [],
    lastEdit: 0 as number,
    version: useVersionStore().getVersion() as string,
    stepsOptions: [
      { name: "breath", duration: 3000, file: '../audio/1.mp3'},
      { name: "body scan", duration: 5000, file: '../audio/2.mp3'},
      { name: "sounds", duration: 7000, file: '../audio/3.mp3'},
      { name: "mantra", duration: 5000, file: '../audio/4.mp3'},
      { name: "bell", duration: 3000, file: '../audio/5.mp3'},
    ] as Step[],
  }),
  actions: {
    addStep(step: Step, insertIndex: number) {
      console.log("add to " + this.$state.steps);
      this.$state.steps.splice(insertIndex, 0, step);
      this.lastEdit = Date.now();
    },
    addStepAtTheBottom(step: Step) {
      console.log("add at the bottom of " + this.$state.steps);
      this.$state.steps.push(step);
      this.lastEdit = Date.now();
    },
    removeStep(removeIndex: number) {
      console.log("remove from " + this.$state.steps);
      if (removeIndex < 0) return;
      this.$state.steps.splice(removeIndex, 1);
      this.lastEdit = Date.now();
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});

/*

* focus your attention on your breath. Notice the sensation of the air as it enters and leaves your body. If your mind wanders, gently bring it back to your breath.

* bring your attention to each part of your body, starting from the top of your head and working your way down to your toes. Notice any sensations or tension and breathe into those areas

* focus your attention on a sound, such as a bell or a piece of calming music. Allow the sound to wash over you and let go of any thoughts or distractions that come up

* repeat a word or phrase that has personal significance to you. It can be something like "peace" or "love," or a phrase like "I am at peace." Repeat the word or phrase silently to yourself, focusing on its sound and meaning

* sound

*/
