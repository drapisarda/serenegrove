<template>
  <PlayerBar 
    :player-steps="playerSteps" :duration="duration" :disabled="disabled"
    @update-model-value="updateRoutineVariation"
  />
</template>
<script lang="ts" setup>
import { useRoutineStore } from "@/store/routine";
const { steps, setRoutineVariation, getRoutineDuration, getPlayerSteps, getRoutineSteps } = useRoutineStore()
const playerSteps = ref(getPlayerSteps());
const disabled = ref(getRoutineSteps().length === 0);
const duration = ref(getRoutineDuration());

watch(steps, () => {
  playerSteps.value = getPlayerSteps();
  duration.value = getRoutineDuration();
  disabled.value = getRoutineSteps().length === 0;
})

const updateRoutineVariation = (newExtendedVariation: boolean) => {
  setRoutineVariation(newExtendedVariation ? 1 : 0)
  duration.value = getRoutineDuration();
}
</script>