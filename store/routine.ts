import { defineStore } from "pinia";
import { useGlobalStore } from "./global";
import { type Step } from "./types";

interface RoutineTimeVariationType {
  id: number,
  label: string;
  modifier: number;
}

export const routineTimeVariations: RoutineTimeVariationType[] = [
  {
    id: 0,
    label: 'standard',
    modifier: 1,
  },
  {
    id: 1,
    label: 'extended',
    modifier: 2,
  },
];

const baseURL = '/';

const originalState = {
  steps: [] as number[],
  lastEdit: 0 as number,
  version: '0' as string,
  intro: { name: 'Intro', duration: 68, file: `${baseURL}assets/audio/intro.mp3`, description: 'Welcome to your meditation routine', icon: `logoOnly`, pauseAfter: 5 } as Step,
  outro: { name: 'Outro', duration: 37, file: `${baseURL}assets/audio/outro.mp3`, description: 'Thank you for meditate with SereneGrove', icon: `logoOnly`, pauseAfter: 0 } as Step,
  stepsOptions: [
    { id: 0, name: 'Breath', duration: 61, file: `${baseURL}assets/audio/breath.mp3`, description: 'Focus your attention on the sensation of the breath, observing its natural flow without trying to control it.', icon: `breath`, pauseAfter: 30 },
    { id: 1, name: 'Body scan', duration: 129, file: `${baseURL}assets/audio/body_scan.mp3`, description: 'Systematically bring awareness to different parts of the body, observing physical sensations without judgment.', icon: `body`, pauseAfter: 120 },
    { id: 2, name: 'Sounds', duration: 52, file: `${baseURL}assets/audio/sounds.mp3`, description: 'Direct your attention to the sounds in your environment, observing them as they arise and fade away without analysis.', icon: `sounds`, pauseAfter: 60 },
    { id: 3, name: 'Mantra', duration: 62, file: `${baseURL}assets/audio/mantra.mp3`, description: 'Repeat a chosen word or phrase silently in your mind to cultivate inner calm and focused awareness.', icon: `mantra`, pauseAfter: 120 },
    { id: 4, name: 'Bell sound', duration: 60, file: `${baseURL}assets/audio/bell.mp3`, description: 'Focus your attention on the sound of a bell, observing its duration, resonance, and fading away to develop concentration.', icon: `bell`, pauseAfter: 5 },
  ] as Step[],
  routineVariation: routineTimeVariations[0] as RoutineTimeVariationType,
}

export const useRoutineStore = defineStore("mainRoutine", {
  state: () => ({
    ...originalState,
    version: useGlobalStore().getVersion(),
  }),
  actions: {
    addStep(step: Step, insertIndex: number) {
      this.$state.steps.splice(insertIndex, 0, step.id);
      this.lastEdit = Date.now();
    },
    addStepAtTheBottom(step: Step) {
      this.$state.steps.push(step.id);
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
    reset() {
      this.$state = originalState;
    },
    getStep(id: number): Step | undefined {
      return this.$state.stepsOptions.find((step) => step.id === id);
    },
    getRoutineSteps(): Step[] {
      return this.$state.steps
        .map(stepId => this.getStep(stepId))
        .filter((step): step is Step => typeof step !== 'undefined');
    },
    getPlayerSteps(): Step[] {
      return [this.$state.intro]
        .concat(this.getRoutineSteps())
        .concat([this.$state.outro])
    },
    getRoutineDuration(modifier: number = this.$state.routineVariation?.modifier): number {
      if (this.getRoutineSteps().length === 0) return 0;
      return this.getPlayerSteps().reduce((acc: number, step: Step) => {
        return acc + step.duration + step.pauseAfter * modifier
      }, 0);
    },
    getRoutineVariationId(): number {
      return this.$state.routineVariation.id;
    },
    setRoutineVariation(routineVariationId: number) {
      const newVariation = routineTimeVariations.find(variation => variation.id === routineVariationId) || routineTimeVariations[0];
      this.$state.routineVariation.id = newVariation.id;
      this.$state.routineVariation.label = newVariation.label;
      this.$state.routineVariation.modifier = newVariation.modifier;
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
