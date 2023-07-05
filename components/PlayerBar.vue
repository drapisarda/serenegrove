<template>
  <div class="player-bar">
    <div class="container row">
      <div class="col col-sm-2">
        <Player>
          <template v-slot:play-button>
            <Play />
          </template>
        </Player>
      </div>
      <div class="col">Your meditation will last {{formattedTime(duration)}}</div>
      <div class="col player-bar__switch">
        Extend duration <Switch v-model="isExtendedDuration" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useRoutineStore } from "@/store/routine";
import Play from "@/src/assets/img/icons/play-button.svg";
const { steps, routineVariation, setRoutineVariation, getRoutineDuration } = useRoutineStore()
import { formattedTime } from '@/composables/formattedTime';
const duration = ref(getRoutineDuration());

// TODO make it better. Not it only manages 2 variations
const isExtendedDuration = ref(false);
onMounted(()=> {
  isExtendedDuration.value = routineVariation.id === 1;
})
watch(steps, () => {
  duration.value = getRoutineDuration();
})
watch(isExtendedDuration, () => {
  setRoutineVariation(isExtendedDuration.value ? 1 : 0);
  duration.value = getRoutineDuration();
});
</script>

<style lang="scss" scoped>
@import "@/style/vars.scss";

.player-bar {
  $root: &;
  width: 100%;
  background-color: $clear-3;
  color: $dark-5;
  display: flex;
  align-items: center;
  z-index: $toastZIndex - 1;

  .row {
    align-items: center;
    justify-content: center;
  }

  .col {
    height: 100%;
    padding-top: 0;
    padding-bottom: 0;
    display: flex;
    align-items: center;
  }

  :deep(.player__start > .player__action) {
    width: 100%;
  }

  :deep(.player) {
    width: 100%;
  }

  :deep(.player__start .button) {
    width: 100%;
    border: none;

    svg {
      width: $listIconSize;
      height: auto;
      fill: $black;

      path {
        fill: $black;
      }

      @media (min-width: $tablet) {
        width: $listIconSizeBig;
      }
    }
  }
}
</style>