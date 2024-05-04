<template>
  <PlayerBar 
    :player-steps="playerSteps" :duration="duration" 
    @update-model-value="updateRoutineVariation"
  />
</template>
<script lang="ts" setup>
import { useRoutineStore } from "@/store/routine";
const { steps, setRoutineVariation, getRoutineDuration, getPlayerSteps, getRoutineSteps } = useRoutineStore()
const playerSteps = ref(getPlayerSteps());
const disable = ref(getRoutineSteps().length === 0);
const duration = ref(getRoutineDuration());

watch(steps, () => {
  playerSteps.value = getPlayerSteps();
  duration.value = getRoutineDuration();
  disable.value = getRoutineSteps().length === 0;
})

const updateRoutineVariation = (newExtendedVariation: boolean) => {
  setRoutineVariation(newExtendedVariation ? 1 : 0)
  duration.value = getRoutineDuration();
}
</script>