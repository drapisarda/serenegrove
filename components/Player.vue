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
        <audio src="" ref="audio" controls @ended="playNext" @play="updateAudioStatus" @pause="updateAudioStatus">
        </audio>
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
const source = ref<HTMLSourceElement>();
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
  const { file, url } = step;
  if (url) {
    return url;
  }

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
    if (step.url || audioCache.has(step.file)) {
      return;
    }
    const fileUrl = await getAudioFileUrl(step);
    console.log(`loading ${step.name}`)
    saveLoadedBlobUrl(index, fileUrl)
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
    // URL.revokeObjectURL(audioUrl.value);
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