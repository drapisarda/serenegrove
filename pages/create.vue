<template>
  <div class="start-wide">
    <div class="start-wide__row row">
      <ClientOnly>
        <template #fallback>
          <Loader />
        </template>

        <Playlist class="col col-md-5 col-lg-4 col-" />

        <div class="col col-md-7 col-lg-8 start-wide__steps-choice">
          <h2 class="start-wide__title">Welcome to your meditation routine</h2>
          <h5 class="start-wide__subtitle">Pick your exercises</h5>
          <div class="start-wide__content card">
            <ListStepItems />
          </div>
        </div>
      </ClientOnly>
    </div>
    <PlayerContainer class="start-wide__player-bar" />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ layout: 'player' })
</script>

<style lang="scss">
@import '@/style/vars.scss';

$contentBg: $dark-2;

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
    margin-bottom: 0;
    padding-top: $gap;
    padding-bottom: $gap;
    .col-no-gutter & {
      margin-top: $size-7;
      padding-left: $gap;
      padding-right: $gap;
    }
  }

  &__subtitle {
    margin-top: 0;
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

    > .col {
      display: flex;
      flex-direction: column;
      height: 100%;
      flex: 1;
      overflow: scroll;
      background-color: $contentBg;
    }
  }

  &__content {
    overflow: hidden;
    position: relative;

    @media (max-width: #{$tablet - 1px}) {
      background: none;
      box-shadow: none;
    }

    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 0;
      width: 100%;
      height: $size-5;
      z-index: 1;
      background: linear-gradient(
        180deg,
        rgba(red($contentBg), green($contentBg), blue($contentBg), 1) 0%,
        rgba(0, 0, 0, 0) 100%
      );

      @media (min-width: $tablet) {
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 1) 0%,
          rgba(0, 0, 0, 0) 100%
        );
      }
    }

    &::before {
      top: 0;
    }

    &:after {
      bottom: 0;
      transform: rotate(180deg);
    }

    .steps-list {
      overflow: scroll;
      height: 100%;

      .col-no-gutter & {
        padding-left: $gap;
        padding-right: $gap;
      }
    }
  }

  .playlist {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: $contentBg;
    height: 100%;
    overflow: visible;

    @media (min-width: $tablet) {
      position: static;
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
