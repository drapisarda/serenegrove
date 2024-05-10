<template>
  <PlayerBar
    :player-steps="playerSteps"
    :duration="duration"
    :disabled="disabled"
    @update-model-value="updateRoutineVariation"
  />
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useRoutineStore } from '@/store/routine'
const {
  setRoutineVariation,
  getRoutineDuration,
  getPlayerSteps,
  getRoutineSteps,
} = useRoutineStore()

const playerSteps = computed(() => getPlayerSteps())
const duration = computed(() => getRoutineDuration())
const disabled = computed(() => getRoutineSteps().length === 0)

const updateRoutineVariation = (newExtendedVariation: boolean) => {
  setRoutineVariation(newExtendedVariation ? 1 : 0)
}
</script>
