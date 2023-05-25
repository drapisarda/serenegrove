<template>
  <div class="player" :class="{ 'player--loaded': loadedStatus }">
    <div class="player__playing"
      :class="{ 'player__playing--visible': !stopStatus, 'player__playing--paused': pauseStatus }">
      <div class="player__loaders section container is-max-desktop">
        <Loader />
        <Waves />
      </div>
      <div class="tile is-parent">
        <div class="container is-max-desktop">
          <div class="player__actions columns is-mobile">
            <div class="column player__action player__action--play-pause column" v-show="pauseStatus" @click="play">
              <img src="/assets/img/icons/32/play-button.png" alt="Play your routine">
              <span>Play</span>
            </div>
            <div class="column player__action player__action--play-pause column" v-show="!pauseStatus" @click="pause">
              <img src="/assets/img/icons/32/pause-button.png" alt="Pause routine">
              <span> Pause </span>
            </div>
            <div class="column player__action player__action--stop column" @click="stop">
              <img src="/assets/img/icons/32/stop-button.png" alt="Pause routine">
              <span>Stop</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tile is-parent">
      <div class="container">
        <div class="player__start is-centered">
          <button class="player__action button success is-large" :class="{ 'inactive': emptyRoutine }" @click="play">
            <template v-if="emptyRoutine">
              Add one step to start your routine
            </template>
            <template v-else>
              <img src="/assets/img/icons/32/play-button.png" alt="Play your routine">
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

const { steps, intro } = useRoutineStore();
watch(steps, (newSteps: Step[]) => {
  stop();
});

const currentIndex = ref(-1);
const pauseStatus = ref(true);
const stopStatus = ref(true);
const loadedStatus = ref(false);

const audio = ref<HTMLAudioElement>();
const audioUrl = ref<string | null>(null);
const audioCache = new Map<string, string>();

const currentStep = computed((): Step => {
  return steps[currentIndex.value] || undefined;
});

const emptyRoutine = computed((): Boolean => {
  return steps.length === 0;
})

const playNext = async () => {
  currentIndex.value++;
  playAudioFile(currentStep.value.file)
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

// DEBUG purposes
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
    const response = await fetch(baseURL + file);
    const blob = await response.blob();
    const fileUrl = URL.createObjectURL(blob);
    return fileUrl;
  } catch (error) {
    console.error(error);
  }

  return 'error';
}

const loadAllSteps = async () => {
  const stepsAndIntro = steps.concat([intro])
  return Promise.all(stepsAndIntro.map(async (step: Step, index: number) => {
    if (audioCache.has(step.file) || stopStatus.value) {
      return;
    }

    try {
      audioCache.set(step.file, await getAudioFileUrl(step.file));
    } catch (error) {
      console.error(error);
    }
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
  loadedStatus.value = true;

  // the user stops before finishing the loading
  if (stopStatus.value) {
    loadedStatus.value = false;
    return;
  }

  playAudioFile(intro.file);
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
  $root: &;

  .block {
    display: flex;
    justify-content: center;
  }

  &__loaders {
    height: 25svh;
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

      .waveContainer {
        display: flex;
      }
    }
  }

  &__playing {
    position: fixed;
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
    flex: 1;
    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    img {
      padding: $size-7;
      filter: invert(100%);
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

}
</style>