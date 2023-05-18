<template>
  <div class="player">
    <div class="player__playing"
      :class="{ 'player__playing--visible': !stopStatus, 'player__playing--paused': pauseStatus }">
      <div class="tile is-parent">
        <div class="container">
          <div class="player__actions columns is-mobile">
            <div class="column player__action player__action--play-pause column">
              <span v-show="pauseStatus" @click="play">▶️</span>
              <span v-show="!pauseStatus" @click="pause">⏸️</span>
            </div>
            <div class="column player__action player__action--stop column" @click="stop">⏹️</div>
          </div>
          <div class="waveContainer">
            <div class="wave wave1"></div>
            <div class="wave wave2"></div>
            <div class="wave wave3"></div>
            <div class="wave wave4"></div>
            <div class="wave wave5"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="tile is-parent">
      <div class="container">
        <div class="player__start">
          <span class="player__action" @click="play">▶️</span>
        </div>
        <audio class="player__audio-element" src="" ref="audio" controls @ended="playNext" @play="updateAudioStatus" @pause="updateAudioStatus">
        </audio>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { useRoutineStore, Step } from "@/store/routine";
import { ref, computed, watch } from "vue";

const { steps } = useRoutineStore();
watch(steps, (newSteps: Step[]) => {
  stop();
});

const currentIndex = ref(-1);
const pauseStatus = ref(true);
const stopStatus = ref(true);

const audio = ref<HTMLAudioElement>();
const audioUrl = ref<string | null>(null);
const audioCache = new Map<string, string>();

const currentStep = computed((): Step => {
  return steps[currentIndex.value] || undefined;
});

const playNext = async () => {
  currentIndex.value++;
  if (!currentStep.value || !audio.value) {
    stop();
    return;
  }

  try {
    const fileUrl = await getAudioFileUrl(currentStep.value);
    console.log(`setting ${currentStep.value.file}`);
    audio.value.src = fileUrl;
    audio.value.play();
  } catch (error) {
    console.error(error);
    stop();
  }
};

const getAudioFileUrl = async (step: Step): Promise<string> => {
  const { file } = step;

  if (audioCache.has(file)) {
    return audioCache.get(file)!;
  }

  const response = await fetch(file);
  const blob = await response.blob();
  const fileUrl = URL.createObjectURL(blob);
  audioCache.set(file, fileUrl);
  return fileUrl;
}

const loadAllSteps = async () => {
  console.log('loading steps')
  return Promise.all(steps.map(async (step: Step, index: number) => {
    if (audioCache.has(step.file)) {
      return;
    }
    const fileUrl = await getAudioFileUrl(step);
    console.log(`loading ${step.name}`)
  }));
}

const play = async () => {
  stopStatus.value = false;
  // pause/play behaviour
  if (currentStep.value) {
    audio.value?.play();
    return;
  };

  await loadAllSteps();
  console.log('steps loaded')
  playNext();
};

const pause = () => {
  if (!audio.value) return;

  audio.value.pause();
}

const stop = () => {
  stopStatus.value = true;
  if (!audio.value) return;

  audio.value.pause();
  currentIndex.value = -1;
  audio.value.currentTime = 0;
  if (audioUrl.value) {
    audioUrl.value = null;
  }
};

const updateAudioStatus = (event: Event) => {
  pauseStatus.value = audio.value?.paused || false;
}

</script>

<style lang="scss">
@import "@/style/vars.scss";
.player {
  .block {
    display: flex;
    justify-content: center;
  }

  &__playing {
    position: absolute;
    top: 0;
    left: 0;
    width: 100svw;
    height: 100svh;
    opacity: 0;
    z-index: $playerZIndex;
    transition: opacity 1s .1s;
    pointer-events: none;
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;

    @keyframes gradient {
      0% {
        background-position: 0% 50%;
      }

      50% {
        background-position: 100% 50%;
      }

      100% {
        background-position: 0% 50%;
      }
    }

    &--visible {
      opacity: 1;
      pointer-events: all;
    }

    &--paused .wave {
      animation-name: off;
      animation-iteration-count: 1;
      animation-fill-mode: forwards;
      transform: scaleY(0.1);
    }
  }

  &__actions {
    justify-content: center;
  }

  &__action {
    flex: 0;
    font-size: 3em;
    padding: 0 0.5em;
  }

  &__audio-element {
    display: none;
  }

}

// audio animation

@keyframes quiet {
  25% {
    transform: scaleY(.6);
  }

  50% {
    transform: scaleY(.4);
  }

  75% {
    transform: scaleY(.8);
  }
}

@keyframes normal {
  25% {
    transform: scaleY(1);
  }

  50% {
    transform: scaleY(.4);
  }

  75% {
    transform: scaleY(.6);
  }
}

@keyframes loud {
  25% {
    transform: scaleY(1);
  }

  50% {
    transform: scaleY(.4);
  }

  75% {
    transform: scaleY(1.2);
  }
}

@keyframes off {
  90% {
    transform: scaleY(0.1);
  }
}

.waveContainer {
  display: flex;
  margin: auto;
  justify-content: space-between;
  height: 64px;
  --boxSize: 8px;
  --gutter: 4px;
  width: calc((var(--boxSize) + var(--gutter)) * 5);
}

.wave {
  transform: scaleY(.4);
  height: 100%;
  width: var(--boxSize);
  background: #12E2DC;
  animation-duration: 1.2s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  border-radius: 8px;
}

.wave1 {
  animation-name: quiet;
}

.wave2 {
  animation-name: normal;
}

.wave3 {
  animation-name: quiet;
}

.wave4 {
  animation-name: loud;
}

.wave5 {
  animation-name: quiet;
}
</style>