<template>
  <div class="player block">
    <div class="container">
      <div class="block">
        <!-- <div class="player__action player__action--play" :class="{ 'player__action--active': !pauseStatus }" @click="play"> -->
        <div class="player__action player__action--play" @click="play">
          ▶️
        </div>
        <!-- <div class="player__action player__action--pause" :class="{ 'player__action--active': pauseStatus }" @click="pause">
          ⏸️
        </div> -->
        <div class="player__action player__action--stop" @click="stop">
          ⏹️
        </div>
      </div>
      <div class="player__now-playing block">
        <audio ref="audio" controls @ended="playNext"></audio>
        &nbsp;
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { useRoutineStore, Step } from "@/store/routine";
import { ref, computed, onMounted, watch } from "vue";

const { steps } = useRoutineStore();
let currentIndex = ref(-1);
let pauseStatus = true;

const audio = ref<HTMLAudioElement>();

onMounted(() => {
  const audioElement = audio.value;
  if (!audioElement) return;
  audioElement.addEventListener("canplay", () => {
    audioElement.play();
  });
  audioElement.addEventListener("play", () => {
    pauseStatus = false;
  })
  audioElement.addEventListener("pause", () => {
    pauseStatus = true;
  })
})

const playNext = async () => {
  currentIndex.value++;
  if (!currentStep) {
    stop();
    return;
  }

  const audioElement = audio.value;
  if (!audioElement) return;

  const response = await fetch(currentStep.value?.file);
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  
  audioElement.src = url;
  audioElement.play();
};

const play = () => {
  stop();
  // TODO caricxare tutti i passi qui
  playNext();
};

const stop = () => {
  currentIndex.value = -1;
  audio.value?.pause();
};

const currentStep = computed((): Step => {
  return steps[currentIndex.value] || undefined;
});
</script>

<style lang="scss">
.player {
  .block {
    display: flex;
    justify-content: center;
  }

  &__action {
    flex: 0;
    font-size: 3em;
    margin-right: 1em;

    &--active {
      background: #f00;
    }
  }
}
</style>