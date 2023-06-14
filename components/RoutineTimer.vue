<template>
  <div>
    <p>{{ formattedTime }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted, watch } from 'vue';

const props = withDefaults(defineProps<{
  time: number,
  start: boolean,
  stop: boolean,
}>(), {
  time: 0,
  start: false,
  stop: false
});

let intervalId: NodeJS.Timer | null = null;
let currentTime = ref(props.time);

const formattedTime = computed(() => {
  let remainingTime = currentTime.value;
  const hours = Math.floor(remainingTime / 3600).toString().padStart(2, '0');
  remainingTime %= 3600;
  const minutes = Math.floor(remainingTime / 60).toString().padStart(2, '0');
  remainingTime %= 60;
  const seconds = remainingTime.toString().padStart(2, '0');
  return hours !== '00' ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
});

const decreaseTime = () => {
  if (currentTime.value > 0) currentTime.value -= 1;
};

const startTimer = () => {
  currentTime.value = props.time;
  intervalId = setInterval(() => {
    if (props.start) decreaseTime();
  }, 1000);
};

const stopTimer = () => {
  if(intervalId) clearInterval(intervalId);
};

watch(() => props.start, (newVal) => {
  if (newVal) {
    startTimer();
  } else {
    stopTimer();
  }
});

watch(() => props.stop, (newVal) => {
  if (newVal) {
    stopTimer();
  }
});

watch(() => props.time, (newVal) => {
  stopTimer();
});

onUnmounted(stopTimer);
</script>
