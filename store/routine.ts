import { defineStore } from "pinia";

import {useVersionStore} from './version';

export const useRoutineStore = defineStore("mainRoutine", {
  state: () => ({
    steps: [] as string[],
    lastEdit: "",
    version: useVersionStore().getVersion(),
    stepsOptions: [
      'breath',
      'body scan',
      'sounds',
      'mantra',
      'bell'
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