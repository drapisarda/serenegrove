<template>
  <li class="card list-item">
    <header class="card-header">
      <div class="card-image">
        <Icon :name="step.icon" />
      </div>
      <div class="card-content">
        <p class="card-header__title">
          {{ step.name }}
        </p>
        <p class="card-header__duration">
          <Clock /> <span>{{ formattedTime(step.duration) }}</span>
        </p>
      </div>
      <div class="card-actions">
        <button
          class="card-header-icon card-actions--move-up"
          :class="{ inactive: isFirst }"
          aria-label="move up"
          @click="emit('moveUp', index)"
        >
          <UpShevron />
        </button>
        <button
          class="card-header-icon card-actions--move-down"
          :class="{ inactive: isLast }"
          aria-label="move down"
          @click="emit('moveDown', index)"
        >
          <DownShevron />
        </button>
        <button
          class="card-header-icon card-actions--remove"
          aria-label="remove element"
          @click="emit('remove', { index, name: step.name })"
        >
          <Bin />
        </button>
      </div>
    </header>
  </li>
</template>

<script lang="ts" setup>
import Bin from '@/src/assets/img/icons/bin.svg'
import UpShevron from '@/src/assets/img/icons/up-chevron.svg'
import DownShevron from '@/src/assets/img/icons/down-chevron.svg'
import Clock from '@/src/assets/img/icons/clock.svg'
import { formattedTime } from '@/composables/formattedTime'
import { type Step } from '@/store/types'

defineProps({
  step: {
    type: Object as PropType<Step>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  isFirst: {
    type: Boolean,
    required: true,
  },
  isLast: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits({
  moveUp: null,
  moveDown: null,
  remove: null,
})
</script>

<style lang="scss">
@import '@/style/vars.scss';
.list-item {
  color: $black;

  .card-image {
    margin: $size-7;
    flex-shrink: 0;
    display: none;

    @media (min-width: $miniMobile) {
      display: flex;
      align-items: center;
    }

    @media (min-width: $tablet) {
      margin: 0;
      margin-left: $size-8;
    }

    svg {
      padding: $size-8;
    }
  }

  .card-header {
    display: flex;
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

  .card-header-icon.inactive {
    opacity: 0.3;
  }

  .card-header__duration {
    font-size: 0.9em;
    color: $dark-3;
    font-weight: normal;
    display: flex;
    align-items: center;

    svg {
      height: 1em;
      width: 1em;
      margin-right: $size-8;
      margin-top: -3px;

      path {
        fill: $dark-3;
      }
    }
  }

  .card-content {
    flex: 1;
    padding: calc($size-7/2) $size-7;
  }

  .card-actions {
    line-height: 0;
  }
}
</style>
