<template>
  <div class="player" :class="{ 'player--loaded': loadedStatus }">
    <div class="player__playing"
      :class="{ 'player__playing--visible': visibleStatus, 'player__playing--paused': pauseStatus }">
      <div class="player__content">
        <div class="player__top section">
          <div class="container">


            <div class="player__page player__page--duration hide-default" :class="{ 'show': askDuration }">
              <div class="container">
                <RoutineDuration />
                <button class="button is-primary is-large" :class="{ 'inactive': !activeStatus }" @click="play">
                  <Play />
                  <div>Start your meditation</div>
                </button>
              </div>
            </div>


            <div class="player__page player__page--feedback hide-default" :class="{ 'show': askFeedback }">
              <div class="container">
                <FeedbackRequest />
              </div>
            </div>

            <div class="player__page player__page--carousel hide-default" :class="{ 'show': !stopStatus }">
              <Loader v-if="!stopStatus" message="Your meditation is loading..." />
              <RoutineCarousel :class="{ 'hide': stopStatus && visibleStatus }" :currentStepIndex="currentIndex"
                :playerSteps="playerSteps" />
            </div>

          </div>
        </div>

        <div class="player__time section" :class="{ 'hide': stopStatus }">
          <RoutineTimer :time="routineDuration" :start="!pauseStatus" :stop="stopStatus" />
        </div>

        <audio class="player__audio-element" src="" ref="audio" controls @ended="playNext" @play="updateAudioStatus"
          @pause="updateAudioStatus">
        </audio>
      </div>
      <div class="player__playing-actions section">
        <div class="container is-max-desktop">
          <div class="player__actions row">
            <div class="col-xs-6 player__action player__action--play-pause" v-show="pauseStatus && !stopStatus">
              <button class="button" @click="play">
                <Play />
                <div>Play</div>
              </button>
            </div>
            <div class="col-xs-6 player__action player__action--play-pause" v-show="!pauseStatus && !stopStatus">
              <button class="button" @click="pause">
                <Pause />
                <div> Pause </div>
              </button>
            </div>
            <div v-if="!stopStatus" class="col-xs-6 player__action player__action--stop">
              <button class="button" @click="stop">
                <Stop />
                <div>Stop</div>
              </button>
            </div>
            <div v-if="stopStatus && askFeedback" class="col-ms-8 player__action player__action--stop">
              <button class="button" @click="stopAndClose">
                End your meditation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container player__display">
      <ClientOnly>
        <template #fallback>
          <Loader />
        </template>
        <div class="player__start is-centered">
          <div class="player__action">
            <button class="button is-primary is-large" :class="{ 'inactive': emptyRoutine }" @click="display">
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
    </div>
  </div>
</template>


<script lang="ts" setup>
import { useRoutineStore, Step } from "@/store/routine";
import { ref, computed, watch } from "vue";
import Play from "@/src/assets/img/icons/play-button.svg";
import Pause from "@/src/assets/img/icons/pause-button.svg";
import Stop from "@/src/assets/img/icons/stop-button.svg";
import { clipHtml } from "@/composables/clipHtml";

const baseURL = import.meta.env.BASE_URL;
const debugAudio = `${baseURL}/assets/audio/1.mp3`;
const debug = false;
const { steps, routineVariation, getPlayerSteps, getRoutineDuration } = useRoutineStore();
let playerSteps = getPlayerSteps();
const routineDuration = ref(getRoutineDuration());

watch(steps, (newSteps: number[]) => {
  routineDuration.value = getRoutineDuration();
  if (!stopStatus) stopAndClose();
});

const currentIndex = ref(-1);
const pauseStatus = ref(true);
const stopStatus = ref(true);
const loadedStatus = ref(false);
const visibleStatus = ref(false);
clipHtml(visibleStatus);

const askFeedback = ref(false);
const askDuration = ref(false);
const activeStatus = computed((): Boolean => !emptyRoutine.value && !!routineVariation && visibleStatus.value);

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
    if (!currentStep.value) { // meditation ends
      stop();
      return;
    }

    playAudioFile(currentStep.value.file);
  }, currentStep.value.pauseAfter * routineVariation.modifier * 1000);
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

const display = () => {
  askDuration.value = true;
  askFeedback.value = false;
  visibleStatus.value = true;
}

const play = async () => {
  if (!activeStatus.value) return;

  askDuration.value = false;

  playerSteps = getPlayerSteps();
  if (debug) {
    playerSteps.map(step => {
      step.file = debugAudio;
      return step;
    })
  }

  stopStatus.value = false;
  pauseStatus.value = false;
  routineDuration.value = getRoutineDuration();
  // pause/play behavior
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
  askFeedback.value = false;
  askDuration.value = false;
  stop();
}
const stop = () => {
  stopStatus.value = true;
  pauseStatus.value = true;
  askFeedback.value = true;
  if (!audio.value) return;
  audio.value.pause();

  setTimeout(() => {
    currentIndex.value = -1;
    if (!audio.value) return;
    audio.value.currentTime = 0;
    if (audioUrl.value) {
      audioUrl.value = null;
    }
  }, 1000)
};
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

  &__display {
    color: $bg;
  }

  &__top {
    flex: 1;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;

    @media (min-width: $tablet) {
      padding-top: $size-2;
      padding-bottom: $size-2;
    }

    .container {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .routine-carousel {
      height: 100%;
    }

    #{$root}--loaded & {
      .rloader {
        display: none;
      }
    }
  }

  &__page {
    position: absolute;
    top: 15svh;
    left: 0;
    width: 100%;
  }

  &__time {
    font-size: $size-2;

    &.section {
      padding-top: 0;
      padding-bottom: 0;
    }
  }

  &__content {
    height: 75svh;
    display: flex;
    flex-direction: column;
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
    max-height: 0;
    max-width: 0;
    overflow: hidden;
    opacity: 0;
    pointer-events: none;
    z-index: $playerZIndex;
    transition: opacity 1s .1s;
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;

    &:not(#{$root}__playing--visible) {
      >* {
        opacity: 0;
      }
    }

    // TODO make a button variant
    #{$root}__action .button {
      width: 100%;
      font-size: $size-4;
      padding-left: $size-6;
      padding-right: $size-6;

      @media (min-width: $miniMobile) {
        padding-left: $size-5;
        padding-right: $size-5;
        font-size: $size-3;
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
      max-width: none;
      max-height: none;
      overflow: visible;
    }
  }

  &__actions {
    justify-content: center;
    display: flex;
  }

  &__action {
    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    .button {
      background: transparent;
      border: 1px solid $white;
      color: $clear-1;

      svg {
        fill: $clear-1;
        height: 42px;
        width: 42px;
      }

      &:hover {
        color: $dark-1;

        border-color: $dark-1;

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