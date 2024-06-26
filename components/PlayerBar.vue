<template>
  <div class="player-bar">
    <div class="container row">
      <div class="col player-bar__duration">
        <Clock /> <span>{{ displayDuration }}</span>
      </div>
      <div class="col col-xs-3 player-bar__button">
        <Player
          :player-steps="playerSteps"
          :routine-modifier="routineVariationModifier"
          :duration="duration"
          :disabled="disabled"
        >
          <template #play-button>
            <Play />
          </template>
        </Player>
      </div>
      <div class="col player-bar__switch">
        Extend
        <Switch
          :id="'extend'"
          v-model="isExtendedDuration"
          @update:model-value="updateRoutineVariation"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { type Step, type RoutineTimeVariationType } from '@/store/types'
import Play from '@/src/assets/img/icons/play-button.svg'
import Clock from '@/src/assets/img/icons/clock.svg'
import { formattedTime } from '@/composables/formattedTime'
import { useRoutineStore } from '@/store/routine'
import { originalState } from '@/store/vars'
const { $state, getRoutineVariation, setRoutineVariation } = useRoutineStore()

const extendedVariation: RoutineTimeVariationType | undefined =
  originalState.routineVariations.find((v) => v.label === 'extended')
const extendedVariationId = extendedVariation?.id
const isExtendedDuration = ref(
  $state.routineVariationId === extendedVariationId,
)
const routineVariationModifier = computed(() => getRoutineVariation().modifier)

const props = defineProps({
  playerSteps: {
    type: Object as PropType<Step[]>,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: Number,
    default: 0,
  },
})

const displayDuration = computed(() => formattedTime(props.duration))

const updateRoutineVariation = () => {
  setRoutineVariation(isExtendedDuration.value ? 1 : 0)
}
</script>

<style lang="scss">
@import '@/style/vars.scss';
$primaryColor: $clear-2;
$secondaryColor: $dark-1;

.player-bar {
  --primary-color: #{$primaryColor};
  --secondary-color: #{$secondaryColor};
  $root: &;
  width: 100%;
  font-size: 0.8em;
  background-color: var(--primary-color);
  color: $dark-5;
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

    > svg {
      height: 1.1em;
      width: 1.1em;
      margin-right: 0.5em;
      path {
        fill: $dark-5;
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

  .player__start > .player__action {
    width: 100%;
  }

  .player {
    width: 100%;
  }

  .player__start .button {
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
}
</style>
