<template>
  <div class="player block">
    <div class="container">
      <div class="block">
        <div class="player__action player__action--play" @click="play">▶️</div>
        <div class="player__action player__action--pause" @click="pause">⏸️</div>
        <div class="player__action player__action--stop" @click="stop">⏹️</div>
      </div>
      <div class="player__now-playing block">
        {{ currentStep }}
        &nbsp;
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { useRoutineStore } from "@/store/routine";

export default {
  name: "Player",
  data() {
    return {
      steps: [] as string[],
      currentIndex: -1 as number,
      intervalId: 0 as number,
    };
  },
  methods: {
    play() {
      this.currentIndex = 0;
      this.intervalId = setInterval(() => {
        this.currentIndex++;
        if (this.currentIndex >= this.currentRoutineOfSteps.length) this.stop();
      }, 5000);
    },
    stop() {
      this.currentIndex = -1;
      clearInterval(this.intervalId);
    },
    pause() {

    },
  },
  computed: {
    currentRoutineOfSteps(): string[] {
      return useRoutineStore().steps;
    },
    currentStep(): string {
      if (!this.intervalId) return "";
      return this.currentRoutineOfSteps[this.currentIndex] || "";
    },
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
  }
}
</style>