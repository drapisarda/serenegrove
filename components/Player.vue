<template>
  <div class="player" :class="{ 'player--loaded': loadedStatus }">
    <div class="player__playing"
      :class="{ 'player__playing--visible': !stopStatus, 'player__playing--paused': pauseStatus }">
      <div class="player__carousel section container is-max-desktop">
        <Loader />
        <RoutineCarousel :currentStepIndex="currentIndex" :playerSteps="playerSteps"/>
      </div>
      <div class="tile is-parent">
        <div class="container is-max-desktop">
          <div class="player__actions columns is-mobile">
            <div class="column player__action player__action--play-pause column" v-show="pauseStatus">
              <button class="button" @click="play">
                <img src="/assets/img/icons/play-button.svg" alt="Play your routine">
                <span>Play</span>
              </button>
            </div>
            <div class="column player__action player__action--play-pause column" v-show="!pauseStatus" >
              <button class="button" @click="pause">
                <img src="/assets/img/icons/pause-button.svg" alt="Pause routine">
                <span> Pause </span>
              </button>
            </div>
            <div class="column player__action player__action--stop column" @click="stop">
              <button class="button">
                <img src="/assets/img/icons/stop-button.svg" alt="Pause routine">
                <span>Stop</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tile is-parent">
      <div class="container">
        <div class="player__start is-centered">
          <button class="player__action button is-primary is-large" :class="{ 'inactive': emptyRoutine }" @click="play">
            <template v-if="emptyRoutine">
              Add one step to start your routine
            </template>
            <template v-else>
              <img src="/assets/img/icons/play-button.svg" alt="Play your routine">
              <span>Start your meditation</span>
            </template>
          </button>
        </div>
        <audio class="player__audio-element" src="" ref="audio" controls @ended="playNext" @play="updateAudioStatus"
          @pause="updateAudioStatus">
        </audio>
      </div>
    </div>
    
  </div>
</template>


<script lang="ts" setup>
import { useRoutineStore, Step } from "@/store/routine";
import { ref, computed, watch } from "vue";

const baseURL = import.meta.env.BASE_URL;
const debugAudio = `${baseURL}/assets/audio/1.mp3`;
const debug = false;

const { steps, intro, outro } = useRoutineStore();
let playerSteps = [intro].concat(steps).concat([outro]);

watch(steps, (newSteps: Step[]) => {
  playerSteps = [intro].concat(steps).concat([outro]);
  if (debug) {
    playerSteps.map(step => {
      step.file = debugAudio;
      step.pauseAfter = 0;
      return step;
    })
  }
  if (!stopStatus) stop();
});

const currentIndex = ref(-1);
const pauseStatus = ref(true);
const stopStatus = ref(true);
const loadedStatus = ref(false);

const audio = ref<HTMLAudioElement>();
const audioUrl = ref<string | null>(null);
const audioCache = new Map<string, string>();

const currentStep = computed((): Step => {
  return playerSteps[currentIndex.value] || undefined;
});

const emptyRoutine = computed((): Boolean => {
  return steps.length === 0;
})

const playNext = async () => {
  setTimeout(() => {
    currentIndex.value++
    if (!currentStep.value) {
      stop();
      return;
    }
  
    playAudioFile(currentStep.value.file);
  }, currentStep.value.pauseAfter !== undefined ? currentStep.value.pauseAfter : 10000);
};

const playAudioFile = async (fileRelativeUrl: string) => {
  if (!fileRelativeUrl || !audio.value) {
    stop();
    return;
  }

  try {
    const fileUrl = await getAudioFileUrl(fileRelativeUrl);
    audio.value.src = fileUrl;
    audio.value.play();
  } catch (error) {
    console.error(error);
    stop();
  }
};

// This is for reset or debug purpose
const audioCacheClean = () => {
  audioCache.forEach((blob: string, fileName: string) => {
    URL.revokeObjectURL(blob);
    audioCache.delete(fileName);
  })
}

const getAudioFileUrl = async (file: string): Promise<string> => {
  if (audioCache.has(file)) {
    return audioCache.get(file)!;
  }

  try {
    console.log('fetching '+file)
    const response = await fetch(file);
    const blob = await response.blob();
    const fileUrl = URL.createObjectURL(blob);
    return fileUrl;
  } catch (error) {
    console.error(error);
  }

  return 'error';
}

const loadAllSteps = async () => {
  return Promise.all(playerSteps.map(async (step: Step, index: number) => {
    if (audioCache.has(step.file) || stopStatus.value) {
      return;
    }

    try {
      if (audioCache.get(step.file)) return;
      audioCache.set(step.file, await getAudioFileUrl(step.file));
    } catch (error) {
      console.error(error);
    }
  }));
}

const play = async () => {
  stopStatus.value = false;
  pauseStatus.value = false;
  // pause/play behaviour
  if (currentStep.value) {
    audio.value?.play();
    return;
  };

  currentIndex.value = 0;

  await loadAllSteps();
  loadedStatus.value = true;

  // the user stops before finishing the loading
  if (stopStatus.value) {
    loadedStatus.value = false;
    return;
  }

  playAudioFile(playerSteps[0].file);
};

const pause = () => {
  if (!audio.value) return;
  pauseStatus.value = true;

  audio.value.pause();
}

const stop = () => {
  stopStatus.value = true;
  pauseStatus.value = true;
  if (!audio.value) return;

  audio.value.pause();
  currentIndex.value = -1;
  audio.value.currentTime = 0;
  if (audioUrl.value) {
    audioUrl.value = null;
  }
};

const updateAudioStatus = (event: Event) => {
  //pauseStatus.value = audio.value?.paused || false;
}

</script>

<style lang="scss">
@import "@/style/vars.scss";

.player {
  $root: &;

  .block {
    display: flex;
    justify-content: center;
  }

  &__carousel {
    height: 50svh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    .waveContainer {
      display: none;
    }

    #{$root}--loaded & {
      .lds-roller {
        display: none;
      }
    }
  }

  &__playing {
    position: fixed;
    top: 0;
    left: 0;
    width: 100svw;
    height: 100vh;
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
    flex: 1;
    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    button {
      background: transparent;
      border: none;
      font-size: $size-2;
      color: $clear;

      img {
        height: 42px;
        width: 42px;
      }
    }

    &--play-pause {
      visibility: hidden;

      #{$root}--loaded & {
        visibility: visible;
      }
    }
  }

  button img {
    filter: invert(100%);
  }

  &__audio-element {
    display: none;
  }

  .routine-carousel {
    display: none;
  }

  &--loaded .routine-carousel {
    display: flex;
  }

}
</style>