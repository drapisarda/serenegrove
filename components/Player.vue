<template>
  <div class="player" :class="{ 'player--loaded': loadedStatus }" tabindex="0" @keyup="handleKeys">
    <Transition>
      <div
v-show="visibleStatus" class="player__playing"
        :class="{'player__playing--paused': pauseStatus }">
        <button class="button button--close" @click="stopOrClose">
          <CloseIcon />
        </button>
        <div class="player__bg"/>
        <div class="player__content">
          <div class="player__top section">
            <div class="container">
              <div class="player__page player__page--feedback hide-default" :class="{ 'show': askFeedback }">
                <div class="container">
                  <FeedbackRequest />
                </div>
              </div>

              <div class="player__page player__page--carousel hide-default" :class="{ 'show': !stopStatus }">
                <Loader v-if="!stopStatus" message="Your meditation is loading..." />
                <RoutineCarousel
:class="{ 'hide': stopStatus && visibleStatus }" :current-step-index="currentIndex"
                  :player-steps="playerSteps" />
              </div>

            </div>
          </div>

          <div class="player__time section" :class="{ 'hide': stopStatus }">
            <RoutineTimer :time="duration" :start="!pauseStatus" :stop="stopStatus" />
          </div>

          <audio ref="audio" class="player__audio-element" src="" controls @ended="playNext"/>
        </div>
        <div class="player__playing-actions">
          <div class="container is-max-desktop">
            <div class="player__actions row">
              <div v-show="pauseStatus && !stopStatus" class="col-xs-6 player__action player__action--play-pause">
                <button class="button player__action__button--play" @click="play">
                  <Play />
                  <div>Play</div>
                </button>
              </div>
              <div v-show="!pauseStatus && !stopStatus" class="col-xs-6 player__action player__action--play-pause">
                <button class="button player__action__button--pause" @click="pause">
                  <Pause />
                  <div> Pause </div>
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
    </Transition>
    <div class="container player__display">
      <ClientOnly>
        <template #fallback/>
        <div class="player__start is-centered">
          <div class="player__action">
            <button class="button is-primary" :class="{ 'inactive': disabled }" @click="display">
              <slot name="play-button">
                <span v-if="disabled">
                  Add one step to start your routine
                </span>
                <template v-else>
                  <Play />
                  <div>Start your meditation</div>
                </template>
              </slot>
            </button>
          </div>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { type Step, type RoutineTimeVariationType } from "@/store/types";
import { ref, computed } from "vue";
import Play from "@/src/assets/img/icons/play-button.svg";
import Pause from "@/src/assets/img/icons/pause-button.svg";
import CloseIcon from "@/src/assets/img/icons/close.svg";
import { clipHtml } from "@/composables/clipHtml";

const baseURL = import.meta.env.BASE_URL;
const debugAudio = `${baseURL}/assets/audio/1.mp3`;
const debug = false;

const props = defineProps({
  playerSteps: {
    type: Object as PropType<Step[]>,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  routineVariation: {
    type: Object as PropType<RoutineTimeVariationType>,
    required: true,
  },
  duration: Number
})

const currentIndex = ref(-1);
const pauseStatus = ref(true);
const stopStatus = ref(true);
const loadedStatus = ref(false);
const visibleStatus = ref(false);
clipHtml(visibleStatus);

const askFeedback = ref(false);
const askDuration = ref(false);
const activeStatus = computed((): boolean => !props.disable && visibleStatus.value);

const audio = ref<HTMLAudioElement>();
const audioUrl = ref<string | null>(null);
const audioCache = new Map<string, string>();

const currentStep = computed((): Step => {
  return props.playerSteps[currentIndex.value] || undefined;
});

const handleKeys = (event: KeyboardEvent) => {
  if (event.key === 'Escape') stopOrClose();
  if (event.key === ' ') pauseStatus.value ? play() : pause();
};

const playNext = async () => {
  setTimeout(() => {
    currentIndex.value++
    if (!currentStep.value) { // meditation ends
      stop();
      return;
    }

    playAudioFile(currentStep.value.file);
  }, currentStep.value.pauseAfter * props.routineVariation.modifier * 1000);
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
  return Promise.all(props.playerSteps.map(async (step: Step, index: number) => {
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
  visibleStatus.value = true;
  play();
}

const play = async () => {
  if (!activeStatus.value) return;

  askDuration.value = false;

  if (debug) {
    props.playerSteps.map((step: Step) => {
      step.file = debugAudio;
      return step;
    })
  }


  stopStatus.value = false;
  pauseStatus.value = false;

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

  playAudioFile(props.playerSteps[0].file);
};

const pause = () => {
  if (!audio.value) return;
  pauseStatus.value = true;

  audio.value.pause();
}

const stopAndClose = () => {
  stop();
  visibleStatus.value = false;
  askFeedback.value = false;
  askDuration.value = false;
}

const stopOrClose = () => {
  if (!stopStatus.value) {
    stop();
  } else stopAndClose();
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

    #{$root}--loaded & .rloader {
      display: none;
    }
  }

  &__page {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  &__start {
    display: flex;
    justify-content: center;
    align-items: center;
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

    .v-enter-from &,
    .v-leave-to & {
      opacity: 0;
    }
  }

  &__playing-actions {

    .container,
    #{$root}__actions {
      height: 100%;
    }

    .button:first-child:last-child {
      min-width: 250px;
    }
  }

  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
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

  &__playing {
    position: fixed;
    top: 0;
    left: 0;
    width: 100svw;
    height: 100vh;
    z-index: $playerZIndex;
    transition: opacity 1s ease;

    &.v-enter-from,
    &.v-leave-to {
      opacity: 0;
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
      --main-color: #{$clear-1};
      border: 1px solid var(--main-color);
      color: var(--main-color);
      width: 100%;
      font-size: $size-4;
      padding-left: $size-6;
      padding-right: $size-6;

      @media (min-width: $miniMobile) {
        padding-left: $size-5;
        padding-right: $size-5;
        font-size: $size-3;
      }

      svg {
        fill: var(--main-color);
        height: 42px;
        width: 42px;

        path {
          fill: var(--main-color);
        }

        @media (min-width: $tablet) {
          margin-right: 0;
        }
      }

      &:hover {
        --main-color: #{$clear-5};
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

    &--close {
      display: flex;
      justify-content: flex-end;
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