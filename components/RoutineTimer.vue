<template>
  <div class="routine-timer">
    <div class="container is-max-desktop">
      {{ formattedTime }}
      <div class="routine-timer__bar" v-if="false">
        <div class="routine-timer__bar-fill" :style="remainingTimeStyle"></div>
        <div class="routine-timer__bar-text">
          {{ formattedTime }}
        </div>
      </div>
    </div>
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
let totalTime = ref(props.time);

const formattedTime = computed(() => {
  let remainingTime = currentTime.value;
  const hours = Math.floor(remainingTime / 3600).toString().padStart(2, '0');
  remainingTime %= 3600;
  const minutes = Math.floor(remainingTime / 60).toString().padStart(2, '0');
  remainingTime %= 60;
  const seconds = remainingTime.toString().padStart(2, '0');
  return hours !== '00' ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
});

const remainingTimeStyle = computed(() => {
  return `transform: scaleX(${currentTime.value / totalTime.value});`;
})

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
  if (intervalId) clearInterval(intervalId);
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


<style lang="scss">
@import "@/style/vars.scss";

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