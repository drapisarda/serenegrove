<template>
  <div class="player-bar">
    <div class="container row">
      <div class="col player-bar__duration">
        <Clock /> <span>{{ formattedTime(props.duration) }}</span>
      </div>
      <div class="col col-xs-3 player-bar__button">
        <Player :playerSteps="playerSteps" :routineVariation="extended" :duration="duration" :disable="disable">
          <template v-slot:play-button>
            <Play />
          </template>
        </Player>
      </div>
      <div class="col player-bar__switch">
        Extend
        <Switch v-model="props.extended" @updateModelValue="updateRoutineVariation"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Play from "@/src/assets/img/icons/play-button.svg";
import Clock from "@/src/assets/img/icons/clock.svg";
import { formattedTime } from '@/composables/formattedTime';

const props = defineProps(['extended', 'duration', 'playerSteps', 'disable']);
const emit = defineEmits(['updateModelValue'])

const updateRoutineVariation = (e: Event) => emit('updateModelValue', e)
</script>

<style lang="scss" scoped>
@import "@/style/vars.scss";
$primaryColor: $clear-2;
$secondaryColor: $dark-1;

.player-bar {
  --primary-color: #{$primaryColor};
  --secondary-color: #{$secondaryColor};
  $root: &;
  width: 100%;
  font-size: 0.8em;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  display: flex;
  align-items: center;
  z-index: $toastZIndex - 1;

  @media (min-width: $tablet) {
    font-size: inherit;
  }

  &--disabled {
    filter: blur(3px);
  }

  .row {
    align-items: center;
    justify-content: center;
    height: 100%;
    overflow: hidden;
  }

  .col {
    height: 100%;
    padding-top: 0;
    padding-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    :deep( > svg) {
      height: 1.1em;
      width: 1.1em;
      margin-right: 0.5em;
      path {
        fill: var(--secondary-color);
      }
    }
  }

  &__button {
    @media (max-width: $tablet) {
      padding-left: $size-8;
      padding-right: $size-8;
    }
  }

  &__switch {
    text-align: left;
  }

  :deep(.player__start > .player__action) {
    width: 100%;
  }

  :deep(.player) {
    width: 100%;
  }

  :deep(.player__start .button) {
    width: 100%;
    background-color: var(--secondary-color);
    border-color: var(--primary-color);
    font-size: 0;
    height: auto;

    &:hover {
      --primary-color: #{$secondaryColor};
      --secondary-color: #{$primaryColor};
    }

    svg {
      width: $listIconSize;
      height: auto;
      fill: var(--primary-color);
      margin-right: 0;
      padding: $size-7 0;

      path {
        fill: var(--primary-color);
      }

      @media (min-width: $tablet) {
        width: $listIconSizeBig;
      }
    }
  }
}</style>