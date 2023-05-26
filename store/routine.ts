import { defineStore } from "pinia";

import { useGlobalStore } from "./global";

export interface Step {
  name: string,
  duration: number,
  file: string,
  description: string,
  icon: string,
  pauseBefore: number,
}

export interface StepIconData {
  url: string,
  altDescription: string
}

export const useRoutineStore = defineStore("mainRoutine", {
  state: () => ({
    steps: [] as Step[],
    lastEdit: 0 as number,
    version: useGlobalStore().getVersion() as string,
    intro:  { name: 'Intro', duration: 3000, file: '/assets/audio/intro.mp3', description: 'Welcome to your meditation routine', icon: 'logo_only.svg' } as Step,
    stepsOptions: [
      { name: 'Breath', duration: 3000, file: '/assets/audio/breath.mp3', description: 'Focus your attention on the sensation of the breath, observing its natural flow without trying to control it.', icon: '005-breath.svg' },
      { name: 'Body scan', duration: 5000, file: '/assets/audio/body_scan.mp3', description: 'Systematically bring awareness to different parts of the body, observing physical sensations without judgment.', icon: '003-meditation.svg' },
      { name: 'Sounds around you', duration: 7000, file: '/assets/audio/sounds.mp3', description: 'Direct your attention to the sounds in your environment, observing them as they arise and fade away without analysis.', icon: '004-landscape.svg' },
      { name: 'Mantra', duration: 5000, file: '/assets/audio/mantra.mp3', description: 'Repeat a chosen word or phrase silently in your mind to cultivate inner calm and focused awareness.', icon: '002-shree.svg' },
      { name: 'Bell sound', duration: 3000, file: '/assets/audio/bell.mp3', description: 'Focus your attention on the sound of a bell, observing its duration, resonance, and fading away to develop concentration.', icon: '001-standing-bell.svg' },
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
  getters: {
    stepIconsDataMap(state): Map<string, StepIconData> {
      const baseURL = import.meta.env.BASE_URL;
      const stepIconData = new Map<string, StepIconData>();
      [state.intro].concat(state.stepsOptions).forEach((step, index) => stepIconData.set(step.name, {
        url: `${baseURL}assets/img/icons/${step.icon}`,
        altDescription: `${step.name} - ${step.description}`.substring(0, 20),
      }));
  
      return stepIconData;
    },
    playerSteps(state): Step[] {
      return [state.intro].concat(state.steps);
    }
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
