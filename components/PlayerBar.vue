<template>
  <div class="player-bar">
    <div class="row">
      <div class="col">
        <Player>
          <template v-slot:play-button>
            <Play />
          </template>
        </Player>
      </div>
      <div class="col">duration</div>
      <div class="col">duration options</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Play from "@/src/assets/img/icons/play-button.svg";
const visible = ref(false);

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
  }

  :deep(.player__start > .player__action) {
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