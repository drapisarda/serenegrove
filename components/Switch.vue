<template>
  <div class="toggle-switch">
    <label class="toggle-label" :for="id">
      {{ label }}
      <input :id="id" v-model="model" type="checkbox" class="toggle-input" />
    </label>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineEmits } from 'vue'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])
const model = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value, props.modelValue)
  },
})
</script>

<style lang="scss">
// https://uiverse.io/ClawHack1/itchy-bobcat-18 edited to be fully HTM compliant

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
      content: '';
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

  .toggle-label:has(.toggle-input:checked) {
    background-color: #4caf50;

    &::before {
      transform: translateX(16px);
    }
  }

  &.light {
    .toggle-label {
      background-color: #bebebe;
    }

    .toggle-label:has(.toggle-input:checked) {
      background-color: #9b9b9b;

      &::before {
        transform: translateX(6px);
      }
    }
  }

  &.dark {
    .toggle-label {
      background-color: #4b4b4b;
    }

    .toggle-label:has(.toggle-input:checked) {
      background-color: #717171;

      &::before {
        transform: translateX(16px);
      }
    }
  }
}
</style>
