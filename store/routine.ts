import { defineStore } from "pinia";
import { useGlobalStore } from "./global";

export interface Step {
  name: string,
  duration: number,
  file: string,
  description: string,
  icon: string,
  pauseAfter: number,
}

const baseURL = import.meta.env.BASE_URL;

export const useRoutineStore = defineStore("mainRoutine", {
  state: () => ({
    steps: [] as Step[],
    lastEdit: 0 as number,
    version: useGlobalStore().getVersion() as string,
    intro:  { name: 'Intro', duration: 3000, file: `${baseURL}assets/audio/intro.mp3`, description: 'Welcome to your meditation routine', icon: `${baseURL}assets/img/icons/logo_only.svg`, pauseAfter: 0 } as Step,
    outro:  { name: 'Outro', duration: 3000, file: `${baseURL}assets/audio/outro.mp3`, description: 'Thank you for meditate with SereneGrove', icon: `${baseURL}assets/img/icons/logo_only.svg`, pauseAfter: 0 } as Step,
    stepsOptions: [
      { name: 'Breath', duration: 3000, file: `${baseURL}assets/audio/breath.mp3`, description: 'Focus your attention on the sensation of the breath, observing its natural flow without trying to control it.', icon: `${baseURL}assets/img/icons/005-breath.svg` },
      { name: 'Body scan', duration: 5000, file: `${baseURL}assets/audio/body_scan.mp3`, description: 'Systematically bring awareness to different parts of the body, observing physical sensations without judgment.', icon: `${baseURL}assets/img/icons/003-meditation.svg` },
      { name: 'Sounds around you', duration: 7000, file: `${baseURL}assets/audio/sounds.mp3`, description: 'Direct your attention to the sounds in your environment, observing them as they arise and fade away without analysis.', icon: `${baseURL}assets/img/icons/004-landscape.svg` },
      { name: 'Mantra', duration: 5000, file: `${baseURL}assets/audio/mantra.mp3`, description: 'Repeat a chosen word or phrase silently in your mind to cultivate inner calm and focused awareness.', icon: `${baseURL}assets/img/icons/002-shree.svg` },
      { name: 'Bell sound', duration: 3000, file: `${baseURL}assets/audio/bell.mp3`, description: 'Focus your attention on the sound of a bell, observing its duration, resonance, and fading away to develop concentration.', icon: `${baseURL}assets/img/icons/001-standing-bell.svg`, pauseAfter: 4 },
    ] as Step[],
  }),
  actions: {
    addStep(step: Step, insertIndex: number) {
      this.$state.steps.splice(insertIndex, 0, step);
      this.lastEdit = Date.now();
    },
    addStepAtTheBottom(step: Step) {
      this.$state.steps.push(step);
      this.lastEdit = Date.now();
    },
    removeStep(removeIndex: number) {
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
