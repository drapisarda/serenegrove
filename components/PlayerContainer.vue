<template>
  <PlayerBar
    :player-steps="playerSteps"
    :duration="duration"
    :disabled="disabled"
  />
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useRoutineStore } from '@/store/routine'
const { getRoutineDuration, getPlayerSteps, getRoutineSteps } =
  useRoutineStore()

const playerSteps = computed(() => getPlayerSteps())
const duration = computed(() => getRoutineDuration())
const disabled = computed(() => getRoutineSteps().length === 0)
</script>
