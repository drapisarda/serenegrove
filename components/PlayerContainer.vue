<template>
  <PlayerBar :playerSteps="playerSteps" :duration="duration" :extended="isExtendedDuration" @updateModelValue="updateRoutineVariation"/>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import { useRoutineStore } from "@/store/routine";
const { steps, routineVariation, setRoutineVariation, getRoutineDuration, getPlayerSteps } = useRoutineStore()
const playerSteps = ref(getPlayerSteps());
const duration = ref(getRoutineDuration());

// TODO make it better. No it only manages 2 variations
const isExtendedDuration = ref(false);
onMounted(() => {
  isExtendedDuration.value = routineVariation.id === 1;
})
watch(steps, () => {
  playerSteps.value = getPlayerSteps();
  duration.value = getRoutineDuration();
})

const updateRoutineVariation = (newExtendedVariation: boolean) => {
  setRoutineVariation(newExtendedVariation ? 1 : 0)
  isExtendedDuration.value = newExtendedVariation;
  duration.value = getRoutineDuration();
}
</script>