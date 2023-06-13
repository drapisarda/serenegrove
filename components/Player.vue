<template>
  <div class="player" :class="{ 'player--loaded': loadedStatus }">
    <div class="player__playing"
      :class="{ 'player__playing--visible': visibleStatus, 'player__playing--paused': pauseStatus }">
      <div class="player__carousel section">
        <div class="container">
          <Loader v-if="!stopStatus" message="Your meditation is loading..." />
          <RoutineCarousel :currentStepIndex="currentIndex" :playerSteps="playerSteps" />
          <div class="player__feedback" v-if="stopStatus && visibleStatus">
            <h3>
              How you liked this meditation?
            </h3>
            <p>
              We'd love to here from you. Please, share your opinion with use. Fill this 3 minutes form and help
              us to grow and make your meditations better and better.
            </p>
            <p class="has-text-centered">
              <a class="button is-primary" :href="feedback_form" target="_blank">
                Give use your feedback
              </a>
            </p>
          </div>
        </div>
      </div>
      <div class="player__playing-actions">
        <div class="container is-max-desktop">
          <div class="player__actions columns is-mobile" ref="playing">
            <div class="column player__action player__action--play-pause column" v-show="pauseStatus && !stopStatus">
              <button class="button" @click="play">
                <Play />
                <div>Play</div>
              </button>
            </div>
            <div class="column player__action player__action--play-pause column" v-show="!pauseStatus && !stopStatus">
              <button class="button" @click="pause">
                <Pause />
                <div> Pause </div>
              </button>
            </div>
            <div class="column player__action player__action--stop column">
              <button class="button" @click="stopAndClose">
                <Stop v-if="!stopStatus" />
                <div v-if="!stopStatus">Stop</div>
                <div v-if="stopStatus">
                  End your meditation
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container is-max-widescreen">
      <ClientOnly>
        <template #fallback>
          <Loader />
        </template>
        <div class="player__start is-centered">
          <div class="player__action">
            <button class=" button is-primary is-large" :class="{ 'inactive': emptyRoutine }" @click="play">
              <span v-if="emptyRoutine">
                Add one step to start your routine
              </span>
              <template v-else>
                <Play />
                <div>Start your meditation</div>
              </template>
            </button>
          </div>
        </div>
      </ClientOnly>
      <audio class="player__audio-element" src="" ref="audio" controls @ended="playNext" @play="updateAudioStatus"
        @pause="updateAudioStatus">
      </audio>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { useRoutineStore, Step } from "@/store/routine";
import { ref, computed, watch, onMounted } from "vue";
import Play from "@/src/assets/img/icons/play-button.svg";
import Pause from "@/src/assets/img/icons/pause-button.svg";
import Stop from "@/src/assets/img/icons/stop-button.svg";

const baseURL = import.meta.env.BASE_URL;
const debugAudio = `${baseURL}/assets/audio/1.mp3`;
const debug = false;
const { feedback_form } = useRuntimeConfig();

const { steps, intro, outro, getPlayerSteps } = useRoutineStore();
let playerSteps = getPlayerSteps();

watch(steps, (newSteps: number[]) => {
  playerSteps = getPlayerSteps();
  if (debug) {
    playerSteps.map(step => {
      step.file = debugAudio;
      step.pauseAfter = 0;
      return step;
    })
  }
  if (!stopStatus) stopAndClose();
});

const currentIndex = ref(-1);
const pauseStatus = ref(true);
const stopStatus = ref(true);
const loadedStatus = ref(false);
const visibleStatus = ref(false);
const playing = ref<HTMLAudioElement>();
const player = ref<HTMLAudioElement>();

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
    if (!currentStep.value) { // mediatation ends
      stop();
      return;
    }

    playAudioFile(currentStep.value.file);
  }, currentStep.value.pauseAfter !== undefined ? currentStep.value.pauseAfter : 10000);
};

const playAudioFile = async (fileRelativeUrl: string) => {
  if (!audio.value) {
    stopAndClose();
    return;
  }

  if (!fileRelativeUrl) {
    stopAndClose();
    return;
  }

  try {
    const fileUrl = await getAudioFileUrl(fileRelativeUrl);
    audio.value.src = fileUrl;
    audio.value.play();
  } catch (error) {
    console.error(error);
    stopAndClose();
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
    const response = await fetch(file);
    const blob = await response.blob();
    const fileUrl = URL.createObjectURL(blob);
    return fileUrl;
  } catch (error) {
    console.error(error);
  }

  return 'error';
}


// TODO: Load also the icons and the full carousel
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
  visibleStatus.value = true;
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

const stopAndClose = () => {
  visibleStatus.value = false;
  stop();
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
  color: $clear-1;

  .block {
    display: flex;
    justify-content: center;
  }

  &__carousel {
    height: 75svh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    @media (min-width: $tablet) {
      padding-top: $size-2;
      padding-bottom: $size-2;
    }

    .routine-carousel {
      height: 100%;
    }

    .waveContainer {
      display: none;
    }

    #{$root}--loaded & {
      .rloader {
        display: none;
      }
    }
  }

  &__playing-actions {
    height: 25svh;

    .container,
    #{$root}__actions {
      height: 100%;
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

    // TODO make a button variant
    #{$root}__action .button {
      @media (min-width: $miniMobile) {
        font-size: $size-3;
        padding-left: $size-5;
        padding-right: $size-5;
      }

      &:hover {
        color: $clear-2;
        border-color: $clear-2;

        svg {
          fill: $clear-2;
        }
      }

      svg {
        @media (min-width: $tablet) {
          margin-right: 0;
        }
      }
    }


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
  }

  &__actions {
    justify-content: center;
    display: flex;
  }

  &__action {
    flex: 0;
    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    .button {
      background: transparent;
      color: $clear-1;

      svg {
        fill: $clear-1;
        height: 42px;
        width: 42px;
      }

      &:hover {
        color: $dark-1;

        svg {
          fill: $dark-1;
        }
      }

      div {
        @media (min-width: $tablet) {
          min-width: 5em;
        }
      }
    }

    &--play-pause {
      visibility: hidden;

      #{$root}--loaded & {
        visibility: visible;
      }
    }
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