<template>
  <div class="duration">
    <h3>Chose the duration you prefer</h3>
    <div class="duration__options">
      <div class="duration__option" v-for="variation in routineTimeVariations ">
        <input type="radio" v-model="variationChose" name="duration" :id="`${variation.label}-duration`" :value="variation.id">
        <label class="button" :for="`${variation.label}-duration`" :class="{'is-primary': variationChose === variation.id, 'is-secondary': variationChose !== variation.id }">
          {{ variation.label }} : {{ formattedTime(getRoutineDuration(variation.modifier)) }}
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoutineStore, routineTimeVariations } from "@/store/routine";
import { formattedTime } from '@/composables/formattedTime';

const { steps, routineVariation, getRoutineDuration, setRoutineVariation } = useRoutineStore();
const variationChose = ref(routineVariation.id);

watch(steps, () => {
  routineDuration.value = formattedTime(getRoutineDuration());
})

watch(variationChose, () => {
  setRoutineVariation(variationChose.value);
  routineDuration.value = formattedTime(getRoutineDuration());
})

const routineDuration = ref(formattedTime(getRoutineDuration()));

const emptyRoutine = computed((): Boolean => steps.length === 0)
</script>

<style lang="scss">
@import "@/style/vars.scss";

.duration {
  visibility: visible;

  &__option {
    margin-bottom: $size-4;
  }

  input {
    display: none;
  }

  .is-primary {
    cursor: pointer;
    pointer-events: none;
  }
}
</style>