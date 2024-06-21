<template>
  <div class="routine-timer">
    <div class="container is-max-desktop">
      {{ displayTime }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted, computed, watch } from 'vue'
import { formattedTime } from '@/composables/formattedTime'

const props = defineProps({
  time: {
    type: Number,
    default: 0,
  },
})

let intervalId: number | null = null
let play: boolean = false
const currentTime = ref(props.time)
const displayTime = computed(() => formattedTime(currentTime.value))

watch(
  () => props.time,
  () => {
    stopTimer()
  },
)

const startTimer = () => {
  if (!window) return

  play = true
  if (intervalId) return

  intervalId = window.setInterval(() => {
    if (currentTime.value == 0) {
      play = false
      stopTimer()
    }
    if (play && currentTime.value > 0) currentTime.value -= 1
  }, 1000)
}

const pauseTimer = () => {
  play = false
}

const stopTimer = () => {
  currentTime.value = props.time

  if (!intervalId) return

  clearInterval(intervalId)
  intervalId = null
}

defineExpose({
  startTimer,
  stopTimer,
  pauseTimer,
})

onUnmounted(stopTimer)
</script>

<style lang="scss">
@import '@/style/vars.scss';

.routine-timer {
  text-align: center;
  &__bar {
    border: 1px solid $clear-1;
    display: flex;
    justify-content: flex-end;
    height: 2em;
    font-size: 1rem;
    color: $clear-1;
    overflow: hidden;
    position: relative;
  }

  &__bar-text {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 1em;
    color: $dark-3;
  }

  &__bar-fill {
    height: 100%;
    width: 100%;
    background-color: $clear-5;
    transition: transform 1s ease-in-out;
    transform-origin: right center;
  }
}
</style>
