<template>
  <li>
    <div class="card card--step">
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
      <div class="card-footer">
        <button class="add-button button is-primary" aria-label="add element" @click="add">
          <Plus />
          <span>
            Add to your routine
          </span>
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
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: $size-3;
  background-color: $white;

  .card-image {
    text-align: center;
    display: block;

    svg {
      height: 100px;

      @media (min-width: $desktop) {
        height: 130px;
      }
    }
  }

  .card-content {
    flex: 1;
  }

  button {
    flex-basis: 100%;
    padding-left: $size-7;
    padding-right: $size-7;
    width: 100%;
    padding-top: $size-5;
    padding-bottom: $size-5;
    border-radius: 0;
    height: auto;
    max-height: none;

    @media (min-width: $tablet) {
      padding-top: $size-7;
      padding-bottom: $size-7;
    }
  }

  .add-button {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card-image,
  .card-header,
  .card-content {
    padding: 0 $size-7;
  }

  .card-image {
    padding-top: $size-5;
    padding-bottom: $size-5;
    line-height: 0;
  }

  .card-header {
    font-weight: bold;
    font-size: 1.2em;
    font-family: 'Quattrocento', 'Times new roman', 'Arial', 'Helvetica', serif;
  }
  
  .card-content {
    padding-bottom: $size-6;
  }
}
</style>
