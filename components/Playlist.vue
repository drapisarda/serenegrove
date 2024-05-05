<template>
  <div
class="playlist" :class="{ 'open': routineOpen, 'scrolling-down': scrollingDown }"
    @touchstart.self="manageTouchStart($event)" @touchend.self="manageTouchEnd($event)" @touchmove.self="manageTouchMove"
    @drag.self="manageDrag">
    <div class="playlist__toggle" @click="routineToggle">
      <DownShevron v-if="routineOpen" />
      <UpShevron v-else />
    </div>
    <div class="card">
      <h5 class="playlist__title">
        Your meditation routine
      </h5>
      <div class="playlist__content">
        <ListItems />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import UpShevron from '@/src/assets/img/icons/up-chevron.svg';
import DownShevron from '@/src/assets/img/icons/down-chevron.svg';

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
const manageTouchEnd = () => {
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

<style lang="scss" >
@import "@/style/vars.scss";
$routineChevronHeight: 3rem;

.playlist {
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

  &.open {
    @media (max-width: ($tablet - 1)) {
      transform: translate(0, -100%);

      &.scrolling-down {
        transform: translate(0, -90%);
      }
    }
  }

  &__toggle {
    transform: translate(0, - $routineChevronHeight - $size-8 - $size-8);
    transition: all 1s ease-in-out;
    overflow: visible;
    height: $routineChevronHeight;
    width: $routineChevronHeight;
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
      padding: $size-8;

      path {
        stroke: $black;
      }
    }

  }

  .card {
    display: flex;
    flex-direction: column;
    max-height: 100%;
  }

  &__content {
    position: relative;
    overflow: hidden;
    
    ul {
      height: 100%;
      overflow: scroll;
      padding: $size-5 $size-8;
    }

    &::before,
    &::after {
      content: "";
      position: absolute;
      left: 0;
      width: 100%;
      height: $size-5;
      background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(0, 0, 0, 0) 100%);
      z-index: 1;
    }

    &::before {
      top: 0;
    }

    &:after {
      bottom: 0;
      transform: rotate(180deg);
      border-bottom-left-radius: $size-8;
      border-bottom-right-radius: $size-8;
    }
  }


  .list-items > p,
  &__title {
    padding-top: $size-7;
    padding-left: $size-7;
    padding-right: $size-7;
    margin-bottom: $size-7;
  }
}
</style>