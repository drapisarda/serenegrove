import { defineStore } from "pinia"
import { useGlobalStore } from "./global"
import { type Step } from "./types"
import { originalState, routineTimeVariations } from './vars'

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
