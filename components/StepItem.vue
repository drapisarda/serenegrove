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
        <p>
          {{ step.description }}
        </p>
      </div>
      <div class="col-md-offset-4 col-md-8 card-footer">
        <button class="button" aria-label="add element to your playlist" @click="add">
          <Plus /> Add to playlist
        </button>
      </div>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import Plus from '@/src/assets/img/icons/plus.svg';
import { useRoutineStore, Step } from "@/store/routine";
import { useGlobalStore, ToastStyles } from "@/store/global";

const { setToastMessage } = useGlobalStore();

const props = defineProps<{ step: Step }>();

const { addStepAtTheBottom } = useRoutineStore();

const add = () => {
  addStepAtTheBottom(props.step);
  setToastMessage(`Step "${props.step.name}" added to the routine`, ToastStyles.Success);
};
</script>

<style lang="scss" scoped>
@import "@/style/vars.scss";

.card {
  text-align: left;
  color: $black;
  width: 100%;
  height: 100%;
  display: flex;
  background-color: $white;
  box-shadow: $defaultBoxShadow;
  font-size: $size-7;
  border: none;
  border-radius: $size-8;

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
      padding: $size-8;

      @media (min-width: $tablet) {
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
      --primary-color: #{$primaryColor};
      --secondary-color: #{$secondaryColor};
      color: var(--primary-color);
      background-color: var(--secondary-color);
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
        border: 1px solid var(--primary-color);
        border-radius: 50%;
        @media (min-width: $desktop) {
          margin-right: 1em;
        }

        :deep(path) {
          fill: var(--primary-color);
        }
      }

      &:hover {
        --primary-color: #{$secondaryColor};
        --secondary-color: #{$primaryColor};
      }
    }
  }

  .card-header {
    font-size: 1.3em;
  }
}
</style>
