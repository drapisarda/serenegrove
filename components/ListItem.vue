<template>
  <li class="card">
    <header class="card-header">
      <div class="card-image">
        <Icon :name="step.icon" />
      </div>
      <div class="card-content">
        <p class="card-header__title">
          {{ step.name }}
        </p>
        <p class="card-header__duration">
          {{ formattedTime(step.duration) }}
        </p>
      </div>
      <div class="card-actions">
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
      </div>
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
import { formattedTime } from '@/composables/formattedTime';

const { setToastMessage } = useGlobalStore();

// TODO use step
const props = defineProps([
  'step',
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
  setToastMessage(`Step "${props.step.name}" removed from the routine`, ToastStyles.Warning);
};
</script>

<style lang="scss" scoped>
@import "@/style/vars.scss";

.card {
  color: $black;

  .card-image {
    padding: $size-7;
    flex-shrink: 0;
    display: none;

    @media (min-width: $miniMobile) {
      display: flex;
      align-items: center;
    }

    @media (min-width: $tablet) {
      padding: $size-8 $size-8 $size-8 $size-7;
    }

    svg {
      width: auto;
      height: $size-2;
      max-width: 100%;
      padding: $size-8;
    }
  }

  .card-header {
    display: flex;
    background-color: $clear-1;
    border-radius: $size-8;
    box-shadow: $defaultBoxShadow;
    align-items: center;
    font-size: $size-6;

    button {
      border: none;
      background: transparent;
    }
  }

  .card-header__title {
    flex: 1;
    display: flex;
    align-items: center;
    margin-bottom: 0;
    white-space: nowrap;
    overflow: hidden;
  }

  button svg {
    height: 22px;
    width: 22px;
    max-width: 100%;
    padding: 2px;

    @media (min-width: $tablet) {
      height: 28px;
      width: 28px;
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

  .card-header__duration {
    font-size: 0.9em;
    color: $dark-3;
    font-weight: normal;
  }

  .card-content {
    flex: 1;
    padding: calc($size-7/2) $size-7;
  }
}
</style>
