<template>
  <div class="start-wide">
    <div class="start-wide__row section--clear row">
      <ClientOnly>
        <template #fallback>
          <Loader />
        </template>

        <div class="col col-lg-7">
          <div class="start-wide__title">
            <h2>
              Pick your exercises
            </h2>
          </div>
          <div class="start-wide__content">
            <ListStepItems />
          </div>
        </div>

        <div class="col col-lg-5 start-wide__routine" :class="{'start-wide__routine--open':routineOpen}">
          <div class="start-wide__routine-toggle" @click="routineToggle">
            <DownShevron v-if="routineOpen" />
            <UpShevron v-else />
          </div>
          <div class="start-wide__title">
            <h2>
              Your meditation routine
            </h2>
          </div>
          <div class="start-wide__content">
            <ListItems />
          </div>
        </div>
      </ClientOnly>
    </div>
    <PlayerBar class="start-wide__player-bar" />
  </div>
</template>

<script lang="ts" setup>
import UpShevron from '@/src/assets/img/icons/up-chevron.svg';
import DownShevron from '@/src/assets/img/icons/down-chevron.svg';
definePageMeta({ layout: 'player' })
const routineOpen = ref(false);

const routineToggle = () => routineOpen.value = !routineOpen.value;
</script>


<style lang="scss" scoped>
@import "@/style/vars.scss";

.start-wide {
  display: flex;
  flex-direction: column;
  color: $black;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  ul {
    list-style: none;
  }

  &__row {
    overflow: hidden;
    flex-direction: column;
    position: relative;

    @media (min-width: $miniMobile) {
      flex-direction: row;
      height: 100%;
    }
  }

  .col {
    display: flex;
    flex-direction: column;
    height: 100%; // TODO is this useful?
    flex: 1;
    overflow: scroll;
  }

  &__content {
    flex: 1;
    overflow: scroll;
  }

  .steps-list {
    overflow: scroll;
  }

  $routineChevronHeight: 4rem;
  &__routine {
    transition: all 1s ease-in-out;
    transform: translate(0, #{- $routineChevronHeight - $size-2});
    @media (min-width: $tablet) {
      transform: translate(0, 0);
    }

    &.col {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      background-color: $dark-2;
      height: 100%;
  
      @media (min-width: $tablet) {
        position: static;
      }
    }

    &--open {
      transform: translate(0, -100%);

      @media (min-width: $tablet) {
        transform: translate(0, 0);
      }
    }
  }

  &__routine-toggle {
    text-align: center;
    @media (min-width: $tablet) {
      display: none;
    }

    svg {
      // DOTO fixa
      height: $routineChevronHeight;
      width: $routineChevronHeight;
      display: inline;


      :deep(path) {
        stroke: $black;
      }
    }

  }

  &__player-bar {
    display: flex;
    align-items: center;
    height: $barHeight;

    &--disabled {
      opacity: 0.5;
      pointer-events: none;
      filter: blur(2px);

      &:hover {
        cursor: pointer;
      }
    }
  }
}</style>