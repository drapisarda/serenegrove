<template>
  <li>
    <div class="card row">
      <div class="col-sm-4">
        <div class="card-image">
          <Icon :name="step.icon" />
        </div>
      </div>
      <div class="col-sm-8 card-content">
        <header class="card-header">
          <p class="card-header-title">
            {{ step.name }}
          </p>
        </header>
        <p class="card-content__description">
          {{ step.description }}
        </p>
        <p class="card-header__duration">
          <Clock/> <span>{{ formattedTime(step.duration) }}</span>
        </p>
      </div>
      <div class="col-xs-offset-4 col-sx-8 card-footer">
        <button class="button" aria-label="add element to your playlist" @click="$emit('add', step)">
          <Plus /> Add to playlist
        </button>
      </div>
    </div>
  </li>
</template>

<script lang="ts" setup>
import Clock from "@/src/assets/img/icons/clock.svg";
import Plus from '@/src/assets/img/icons/plus.svg';
import { formattedTime } from '@/composables/formattedTime';

defineEmits({
  'add': null,
})

const props = defineProps(['step']);
</script>

<style lang="scss" scoped>
@import "@/style/vars.scss";

.card {
  text-align: left;
  color: $black;
  width: 100%;
  height: 100%;
  display: flex;
  font-size: $size-6;
  @media (min-width: $tablet) {
    font-size: $size-7;
  }
  @media (min-width: $desktop) {
    font-size: $size-6;
  }

  &.row {
    padding: $size-7;

    >div {
      padding: $size-8 0;

      @media (min-width: $miniMobile) {
        padding: $size-8;
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

    svg {
      padding: $size-6;
      
      @media (min-width: $tablet) {
        padding: $size-8;
      }
      @media (min-width: $desktop) {
        padding: $size-6;
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
      padding: 0.2em 0.5em;
      border-radius: $size-8;

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
