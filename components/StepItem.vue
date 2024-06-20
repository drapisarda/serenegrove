<template>
  <li class="step-item">
    <div class="card row">
      <div class="col-xs-12 col-sm-3">
        <div class="card-image">
          <Icon :name="step.icon" />
        </div>
      </div>
      <div class="col-sm-9 col-sm-8 card-content">
        <header class="card-header">
          <p class="card-header-title">
            {{ step.name }}
          </p>
        </header>
        <p class="card-content__description">
          {{ step.description }}
        </p>
        <p class="card-header__duration">
          <Clock /> <span>{{ formattedTime(step.duration) }}</span>
        </p>
      </div>
      <div class="col-xs-offset-4 col-sm-8 card-footer">
        <button
          class="button"
          aria-label="add element to your playlist"
          @click="$emit('add', step)"
        >
          <Plus /> Add to playlist
        </button>
      </div>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { type Step } from '@/store/types'
import Clock from '@/src/assets/img/icons/clock.svg'
import Plus from '@/src/assets/img/icons/plus.svg'
import { formattedTime } from '@/composables/formattedTime'

defineEmits({
  add: null,
})

defineProps({
  step: {
    type: Object as PropType<Step>,
    required: true,
  },
})
</script>

<style lang="scss">
@import '@/style/vars.scss';

.step-item .card {
  text-align: left;
  color: $black;
  width: 100%;
  height: 100%;
  display: flex;
  font-size: $size-6;
  box-shadow: none;
  @media (min-width: $tablet) {
    font-size: $size-7;
  }
  @media (min-width: $desktop) {
    font-size: $size-6;
  }

  &.row {
    padding: 0;

    > div {
      padding: $size-8;

      @media (min-width: $miniMobile) {
        padding: $size-8 * 2;
      }
    }
  }

  .card-image {
    text-align: center;
    display: block;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    aspect-ratio: 1;
    padding: 0;

    svg {
      width: 100%;
      height: 100%;
      padding-bottom: 100%;
      padding: $size-7;

      @media (min-width: $desktop) {
        padding: $size-7;
      }
    }
  }

  .card-content {
    color: $black;
    display: flex;
    flex-direction: column;

    p {
      flex: 1;
    }
  }

  $primaryColor: $black;
  $secondaryColor: $white;

  .card-footer {
    align-self: flex-end;

    .button {
      border: none;
      display: flex;
      align-items: center;
      padding: 0.5em;
      border-radius: $size-8;
      box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);

      svg {
        height: 1.1em;
        width: 1.1em;
        padding: 0.1em;
        display: inline;
        border-width: 1px;
        border-style: solid;
        border-radius: 50%;
        @media (min-width: $desktop) {
          margin-right: 1em;
        }
      }
    }
  }

  .card-header {
    font-size: 1.3em;

    &__duration {
      display: flex;
      align-items: center;
      color: $dark-3;

      svg {
        width: 1em;
        height: 1em;
        margin-right: $size-8;
        margin-top: -1px;

        :deep(path) {
          fill: $dark-3;
        }
      }
    }
  }
}
</style>
