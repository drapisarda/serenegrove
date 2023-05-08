<template>
  <div class="player block">
    <div class="container">
      <div class="block">
        <div class="player__action player__action--play"
          :class="{ 'player__action--active': !pauseStatus && currentIndex > -1 }" @click="play">
          ▶️
        </div>
        <div class="player__action player__action--pause" :class="{ 'player__action--active': pauseStatus }"
          @click="pause">
          ⏸️
        </div>
        <div class="player__action player__action--stop" @click="stop">
          ⏹️
        </div>
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

const { steps } = useRoutineStore();
const currentIndex = ref(-1);
const pauseStatus = ref(true);

const audio = ref<HTMLAudioElement>();
const audioElementComputed = computed(() => audio.value);

onMounted(() => {
  if (!audioElementComputed.value) return;
})

const currentStep = computed((): Step => {
  return steps[currentIndex.value] || undefined;
});

const playNext = async () => {
  currentIndex.value++;
  if (!currentStep.value || !audioElementComputed.value) {
    stop();
    return;
  }

  try {
    const response = await fetch(currentStep.value?.file);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    await loadAudio(url);
    audioElementComputed.value.play();
  } catch (error) {
    console.error(error);
    stop();
  }
};

const loadAudio = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const audioElement = audioElementComputed.value;
    if (!audioElement) {
      reject(new Error("Audio element is not defined"));
      return;
    }

    audioElement.src = url;
    audioElement.onloadeddata = () => {
      resolve();
    };
    audioElement.onerror = () => {
      reject(new Error("Failed to load audio file"));
    };
  });
};

const play = () => {
  if (currentStep.value) {
    audio.value?.play();
    return;
  };

  // nuova riproduzione
  // TODO caricare tutti i passi qui

  playNext();  
};

const pause = () => {
  if (!audioElementComputed.value) return;

  audioElementComputed.value.pause();
}

const stop = () => {
  if (!audioElementComputed.value) return;

  audioElementComputed.value.pause();
  currentIndex.value = -1;
  audioElementComputed.value.currentTime = 0;
};

const updateAudioStatus = (event: any) => {
  if (!audioElementComputed.value) return true;
  pauseStatus.value = audioElementComputed.value.paused && currentIndex.value > -1;
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
    margin-right: 1em;

    &--active {
      background: #f00;
    }
  }
}
</style>