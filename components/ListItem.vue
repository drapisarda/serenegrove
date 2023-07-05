<template>
  <li class="card card--list-item">
    <header class="card-header">
      <div class="card-image">
        <Icon :name="icon" />
      </div>
      <p class="card-header-title">
        {{ itemName }}
      </p>
      <button @click="moveUp" class="card-header-icon" :class="{ 'card-header-icon--inactive': isFirst }"
        aria-label="move up">
        <UpShevron />
      </button>
      <button @click="moveDown" class="card-header-icon" :class="{ 'card-header-icon--inactive': isLast }"
        aria-label="move down">
        <DownShevron />
      </button>
      <button class="card-header-icon" aria-label="remove element" @click="remove">
        <Bin />
      </button>
    </header>
  </li>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import Bin from '@/src/assets/img/icons/bin.svg';
import UpShevron from '@/src/assets/img/icons/up-chevron.svg';
import DownShevron from '@/src/assets/img/icons/down-chevron.svg';
import { useRoutineStore } from "@/store/routine";
import { useGlobalStore, ToastStyles } from "@/store/global";

const { setToastMessage } = useGlobalStore();

// TODO use step
const props = defineProps([
  'itemName',
  'icon',
  'index',
  'isFirst',
  'isLast',
]);

const { moveStep, removeStep } = useRoutineStore();

const moveUp = () => {
  moveStep(props.index, -1);
};

const moveDown = () => {
  moveStep(props.index, 1);
};

const remove = () => {
  removeStep(props.index)
  setToastMessage(`Step "${props.itemName}" removed from the routine`, ToastStyles.Warning);
};
</script>

<style lang="scss" scoped>
@import "@/style/vars.scss";

.card {
  color: $black;
  box-shadow: 0 0.5em 1em -0.125em hsla(0, 0%, 4%, .1), 0 0 0 1px hsla(0, 0%, 4%, .02);

  +& {
    margin-bottom: $size-5;
  }

  .card-image {
    padding: $size-7;
    flex-shrink: 0;
    display: none;

    @media (min-width: $miniMobile) {
      display: flex;
      align-items: center;
    }

    @media (min-width: $tablet) {
      padding: $size-6;
    }

    svg {
      width: auto;
      height: $size-3;
      max-width: 100%;
      fill: $black;

      @media (min-width: $tablet) {
        height: $size-2;
      }
    }
  }
  .card-header {
    display: flex;
    background-color: $clear-1;
    border-radius: $size-8;
    box-shadow: 0 0.125em 0.25em hsla(0,0%,4%,.1);

    button {
      border: none;
      background: transparent;
    }
  }

  .card-header-title {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: clamp(1rem, 3vw, 1.6rem);
    padding: calc($size-7/2) $size-7;
    margin-bottom: 0;
    white-space: nowrap;
    overflow: hidden;
  }

  button svg {
    height: 24px;
    width: 24px;
    max-width: 100%;

    @media (min-width: $tablet) {
      height: 32px;
      width: 32px;
    }

  }

  .card-header-icon svg {
    stroke: $black;
  }

  .card-header-icon {
    flex-shrink: 0;
    cursor: pointer;
  }

  .card-header-icon--inactive {
    opacity: 0.3;
    pointer-events: none;
    cursor: default;
  }
}
</style>
