<template>
  <div class="player-bar">
    <div class="container row">
      <div class="col">
        <Player>
          <template v-slot:play-button>
            <Play />
          </template>
        </Player>
      </div>
      <div class="col">Your meditation will last {{formattedTime(duration)}}</div>
      <div class="col player-bar__switch">
        Extend duration <Switch v-model="extendedDuration" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useRoutineStore } from "@/store/routine";
import Play from "@/src/assets/img/icons/play-button.svg";
const { routineVariation, setRoutineVariation, getRoutineDuration } = useRoutineStore()
import { formattedTime } from '@/composables/formattedTime';
const duration = ref(getRoutineDuration());

// TODO make it better. Not it only manages 2 variations
const extendedDuration = ref(false);
onMounted(()=> {
  extendedDuration.value = routineVariation.id === 1;
})
watch(extendedDuration, () => {
  setRoutineVariation(extendedDuration.value ? 1 : 0);
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