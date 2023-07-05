<template>
  <div class="toggle-switch">
    <input class="toggle-input" :checked="modelValue" @input="$emit('update:modelValue', $event.target.checked)" id="toggle" type="checkbox">
    <label class="toggle-label" for="toggle"/>
  </div>
</template>

<script lang="ts" setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<style lang="scss">
// https://uiverse.io/ClawHack1/itchy-bobcat-18

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
  margin: 10px;

  .toggle-input {
    display: none;
  }

  .toggle-label {
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 24px;
    background-color: #ccc;
    border-radius: 34px;
    cursor: pointer;
    transition: background-color 0.3s;

    &::before {
      content: "";
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      top: 2px;
      left: 2px;
      background-color: #fff;
      box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
      transition: transform 0.3s;
    }
  }

  .toggle-input:checked + .toggle-label {
    background-color: #4CAF50;

    &::before {
      transform: translateX(16px);
    }
  }

  &.light {
    .toggle-label {
      background-color: #BEBEBE;
    }

    .toggle-input:checked + .toggle-label {
      background-color: #9B9B9B;

      &::before {
        transform: translateX(6px);
      }
    }
  }

  &.dark {
    .toggle-label {
      background-color: #4B4B4B;
    }

    .toggle-input:checked + .toggle-label {
      background-color: #717171;

      &::before {
        transform: translateX(16px);
      }
    }
  }
}

</style>