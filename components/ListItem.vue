<template>
  <li class="card">
    <header class="card-header">
      <div class="card-image">
        <Icon :name="icon" />
      </div>
      <p class="card-header-title">
        {{ itemName }}
      </p>
      <button @click="moveUp" class="card-header-icon"
        :class="{ 'card-header-icon--inactive': isFirst }" aria-label="move up">
        <UpShevron />
      </button>
      <button @click="moveDown" class="card-header-icon"
        :class="{ 'card-header-icon--inactive': isLast }" aria-label="move down">
        <DownShevron />
      </button>
      <button class="card-header-icon" aria-label="remove element" @click="remove">
        <Bin />
      </button>
    </header>
  </li>
</template>

<script lang="ts" setup>
import { defineProps, ref, watch } from "vue";
import Bin from '@/src/assets/img/icons/bin.svg';
import UpShevron from '@/src/assets/img/icons/up-chevron.svg';
import DownShevron from '@/src/assets/img/icons/down-chevron.svg';
import { useRoutineStore } from "@/store/routine";

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

const remove = () => removeStep(props.index);
</script>

<style lang="scss" scoped>
@import "@/style/vars.scss";

.card {
  overflow: visible;

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

      @media (min-width: $tablet) {
        height: $size-2;
      }
    }
  }

  .card-header-title {
    font-size: clamp(1rem, 3vw, 1.6rem);
    padding: calc($size-7/2) $size-7;
    margin-bottom: 0;
    white-space: nowrap;
    overflow: hidden;
  }

  button svg {
    height: 24px;
    width: 24px;

    @media (min-width: $tablet) {
      height: 32px;
      width: 32px;
    }
  }

  .card-header {
    display: flex;
    background-color: $clear-1;

    button {
      border: none;
      background: transparent;
    }
  }

  .card-header-title {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .card-header-icon {
    flex-shrink: 0;
  }

  .card-header-icon--inactive {
    opacity: 0.3;
    pointer-events: none;
  }
}
</style>
