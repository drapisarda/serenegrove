<template>
  <li>
    <button class="card" aria-label="add element" @click="add">
      <div class="card-image">
        <Icon :name="step.icon" />
      </div>
      <header class="card-header">
        <p class="card-header-title">
          {{ step.name }}
        </p>
      </header>
      <div class="card-content">
        <div class="content">
          <p>
            {{ step.description }}
          </p>
        </div>
      </div>
      <!-- <div class="card-footer">
        <button class="add-button button is-primary" aria-label="add element" @click="add">
          <Plus />
          <span>
            Add to your routine
          </span>
        </button>
      </div> -->
    </button>
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
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: $size-3;
  background-color: $white;
  box-shadow: $defaultBoxShadow;
  font-size: $size-7;
  border: none;
  border-radius: $size-8;

  &:hover {
    background-color: $clear-4;
  }

  .card-image {
    text-align: center;
    display: block;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    padding: $size-7;

    @media (min-width: $tablet) {
      aspect-ratio: 1;
    }

    svg {
      padding: $size-6;
    }
  }

  .card-content {
    flex: 1;
    color: $black;
  }

  button {
    flex-basis: 100%;
    padding: $size-7 $size-8;
    width: 100%;
    border-radius: 0;
    height: auto;
    max-height: none;
  }

  .add-button {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card-header,
  .card-content {
    padding: 0 $size-7;
  }

  .card-header {
    font-size: 1.2em;
  }
  
  .card-content {
    padding-bottom: $size-6;
  }
}
</style>
