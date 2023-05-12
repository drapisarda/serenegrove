<template>
  <div class="player block">
    <div class="container">
      <div class="block">
        <div class="player__action player__action--play-pause">
          <span v-show="pauseStatus" @click="play">▶️</span>
          <span v-show="!pauseStatus" @click="pause">⏸️</span>
        </div>
        <div class="player__action player__action--stop" @click="stop">⏹️</div>
      </div>
      <div class="player__now-playing block">
        <audio ref="audio" controls @ended="playNext" @play="updateAudioStatus" @pause="updateAudioStatus"></audio>
        &nbsp;
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { useRoutineStore, Step } from "@/store/routine";
import { ref, computed, onMounted, watch } from "vue";

const { steps, saveLoadedBlobUrl } = useRoutineStore();
watch(steps, (newSteps: Step[]) => {
  stop();
});

const currentIndex = ref(-1);
const pauseStatus = ref(true);

const audio = ref<HTMLAudioElement>();
const audioUrl = ref<string | null>(null);

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
    if (!currentStep.value.url) console.error('impossible to load');
    console.log(`setting ${currentStep.value.file}`)
    audio.value.src = currentStep.value.file;
    audio.value.play();
  } catch (error) {
    console.error(error);
    stop();
  }
};


const loadAllSteps = async () => {
  console.log('loading steps')
  return Promise.all(steps.map(async (step: Step, index: number) => {
    if (step.url) return;
    const response = await fetch(step.file);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    console.log('loading steps' + step.name)
    saveLoadedBlobUrl(index, url)
  }));
}

const play = async () => {
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
  if (!audio.value) return;

  audio.value.pause();
  currentIndex.value = -1;
  audio.value.currentTime = 0;
  if (audioUrl.value) {
    URL.revokeObjectURL(audioUrl.value);
    audioUrl.value = null;
  }
};

const updateAudioStatus = (event: Event) => {
  pauseStatus.value = audio.value?.paused || false;
}

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
    padding: 0 0.5em;
  }
}
</style>