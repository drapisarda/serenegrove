<template>
  <div class="player block">
    <div class="container">
      <div class="block">
        <div class="player__action player__action--play" :class="{ 'player__action--active': isPlaying }" @click="play">
          ▶️
        </div>
        <div class="player__action player__action--pause" :class="{ 'player__action--active': isPaused }" @click="pause">
          ⏸️
        </div>
        <div class="player__action player__action--stop" @click="stop">
          ⏹️
        </div>
      </div>
      <div class="player__now-playing block">
        <span v-if="currentStep">{{ currentStep }}</span>
        &nbsp;
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { useRoutineStore, Step } from "@/store/routine";

export default {
  name: "Player",
  data() {
    return {
      currentIndex: -1 as number,
      isPlaying: false as boolean,
      isPaused: false as boolean,
    };
  },
  methods: {
    wait(duration: number) { // will be replaced with media controlls
      return new Promise(resolve => setTimeout(resolve, duration));
    },    
    async showNext() { // will be replaced with media controlls
      this.currentIndex++;
      if (this.currentIndex >= this.steps.length) {
        this.stop();
        return;
      }

      if (this.isPaused) return;

      await this.wait(this.currentStep?.duration || 0)
      this.showNext();
    },
    play() {
      this.isPlaying = true;
      this.isPaused = false;
      this.showNext();
    },
    stop() {
      this.currentIndex = -1;
      this.isPlaying = false;
      this.isPaused = false;
    },
    pause() {
      this.isPaused = this.isPlaying;
      this.isPlaying = false;
    },
  },
  computed: {
    steps(): Step[] {
      return useRoutineStore().steps;
    },
    currentStep(): Step | undefined {
      return this.steps[this.currentIndex] || undefined;
    },
    currentStepDuration(): number | undefined {
      return this.currentStep?.duration;
    }
  },
};
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