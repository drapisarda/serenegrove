import { defineStore } from 'pinia'
import { useGlobalStore } from './global'
import { type Step, type RoutineTimeVariationType } from './types'
import { originalState } from './vars'

export const useRoutineStore = defineStore('mainRoutine', {
  state: () => ({
    ...originalState,
    version: useGlobalStore().getVersion(),
  }),
  actions: {
    addStep(step: Step, insertIndex: number) {
      this.$state.steps.splice(insertIndex, 0, step.id)
      this.lastEdit = Date.now()
    },
    addStepAtTheBottom(step: Step) {
      this.$state.steps.push(step.id)
      this.lastEdit = Date.now()
    },
    removeStep(removeIndex: number) {
      if (removeIndex < 0) return
      this.$state.steps.splice(removeIndex, 1)
      this.lastEdit = Date.now()
    },
    moveStep(stepIndex: number, amount: number) {
      const newIndex = stepIndex + amount
      if (newIndex < 0 || newIndex >= this.$state.steps.length) return
      const element = this.$state.steps[stepIndex]
      this.$state.steps.splice(stepIndex, 1)
      this.$state.steps.splice(newIndex, 0, element)
    },
    reset() {
      this.$state = originalState
    },
    getStep(id: number): Step | undefined {
      return this.$state.stepsOptions.find((step) => step.id === id)
    },
    getRoutineSteps(): Step[] {
      return this.$state.steps
        .map((stepId) => this.getStep(stepId))
        .filter((step): step is Step => typeof step !== 'undefined')
    },
    getPlayerSteps(): Step[] {
      return [this.$state.intro]
        .concat(this.getRoutineSteps())
        .concat([this.$state.outro])
    },
    getRoutineDuration(): number {
      if (this.getRoutineSteps().length === 0) return 0
      return this.getPlayerSteps().reduce((acc: number, step: Step) => {
        return (
          acc +
          step.duration +
          step.pauseAfter * this.getRoutineVariation().modifier
        )
      }, 0)
    },
    getRoutineVariationId(): number {
      return this.$state.routineVariationId
    },
    getRoutineVariation(): RoutineTimeVariationType | undefined {
      const routineVariation = this.$state.routineVariations.find(
        (variation) => variation.id === this.$state.routineVariationId,
      )

      return routineVariation
    },
    setRoutineVariation(routineVariationId: number) {
      this.$state.routineVariationId = routineVariationId
    },
  },
  persist: {
    storage: import.meta.client ? persistedState.localStorage : {},
  },
})
