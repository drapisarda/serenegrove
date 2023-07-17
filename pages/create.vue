<template>
  <div class="start-wide">
    <div class="start-wide__row row">
      <ClientOnly>
        <template #fallback>
          <Loader />
        </template>

        <div class="col col-lg-7 col-no-gutter">
          <div class="start-wide__title">
            <h2>
              Pick your exercises
            </h2>
          </div>
          <div class="start-wide__content">
            <ListStepItems />
          </div>
        </div>

        <div class="col col-lg-5 col-no-gutter start-wide__routine"
          :class="{ 'open': routineOpen, 'scrolling-down': scrollingDown }" @touchstart.self="manageTouchStart($event)"
          @touchend.self="manageTouchEnd($event)" @touchmove.self="manageTouchMove" @drag.self="manageDrag">
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
let touchStart = 0;
let touchLast: number;
const scrollDownLimit = 300;
const scrollingDown = ref(false)

const routineToggle = () => {
  routineOpen.value = !routineOpen.value;
  scrollingDown.value = false;
}
const manageTouchStart = (event: TouchEvent) => {
  if (!event.touches || !event.touches[0]) return;
  touchStart = event.touches[0].pageY;
}
const manageTouchEnd = (event: TouchEvent) => {
  scrollingDown.value = false;
  if (touchLast - touchStart < scrollDownLimit) return;
  touchLast = 0;
  routineOpen.value = false;
}
const manageTouchMove = (event: TouchEvent) => {
  touchLast = event.touches[0].pageY;
  const scrollValue = touchLast - touchStart;
  if (scrollValue < 0) return;
  scrollingDown.value = scrollValue > (scrollDownLimit / 3);
  if (scrollValue > scrollDownLimit) manageTouchEnd(event);
}

const manageDrag = (event: DragEvent) => console.log(event)
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

  &__title {
    .col-no-gutter & {
      padding-top: $gap;
      padding-left: $gap;
      padding-right: $gap;
    }
  }

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
    background-color: $dark-2;
  }

  &__content {
    overflow: hidden;
    position: relative;

    &::before,
    &::after {
      content: "";
      position: absolute;
      left: 0;
      width: 100%;
      height: $size-5;
      background: linear-gradient(180deg, rgba(red($dark-2), green($dark-2), blue($dark-2), 1) 0%, rgba(0, 0, 0, 0) 100%);
      z-index: 1;
    }

    &::before {
      top: 0;
    }

    &:after {
      bottom: 0;
      transform: rotate(180deg);
    }

    .list-items,
    .steps-list {
      overflow: scroll;
      height: 100%;
      padding: $size-5 0;

      .col-no-gutter & {
        padding-left: $gap;
        padding-right: $gap;
      }
    }
  }

  $routineChevronHeight: 4rem;

  &__routine {
    transition: all 1s ease-in-out;
    transform: translate(0, 0);
    z-index: 2;
    user-select: none;

    @media (max-width: ($tablet - 1)) {
      padding-top: 0;
    }

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
      overflow: visible;

      @media (min-width: $tablet) {
        position: static;
      }
    }

    &.open {
      @media (max-width: ($tablet - 1)) {
        transform: translate(0, -100%);
        &.scrolling-down {
          transform: translate(0, -90%);
        }
      }
    }

  }

  &__routine-toggle {
    transform: translate(0, - $routineChevronHeight - $size-8 - $size-8);
    transition: all 1s ease-in-out;
    overflow: visible;
    height: $routineChevronHeight;
    width: $routineChevronHeight;
    margin-right: $size-7;
    align-self: flex-end;
    position: relative;

    &:before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: $dark-2;
      border-radius: 100%;
      border: 1px solid $black;
      opacity: 1;
      transition: opacity 0.4s linear 0.6s;
      z-index: -1;

      .open & {
        @media (max-width: ($tablet - 1)) {
          opacity: 0;
          background-color: $dark-2;
        }
      }
    }

    @media (min-width: $tablet) {
      display: none;
    }

    .open & {
      @media (max-width: ($tablet - 1)) {
        transform: translate(0, 0);
      }
    }

    svg {
      cursor: pointer;
      height: 100%;
      width: 100%;
      z-index: 2;

      :deep(path) {
        stroke: $black;
      }
    }

  }

  &__player-bar {
    display: flex;
    align-items: center;
    height: calc(#{$barHeight} + 100vh - 100svh + #{$size-8});
    padding-bottom: calc(100vh - 100svh + #{$size-8});
    padding-top: $size-8;

    &--disabled {
      opacity: 0.5;
      pointer-events: none;
      filter: blur(2px);

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>