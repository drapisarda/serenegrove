<template>
  <div class="duration">
    <div class="duration__options">
      <div class="duration__option" v-for="variation in routineTimeVariations" :key="variation.id">
        <input type="radio" v-model="variationChose" name="duration" :id="`${variation.label}-duration`"
          :value="variation.id">
        <label class="button" :for="`${variation.label}-duration`"
          :class="{ 'is-primary': variationChose === variation.id, 'is-secondary': variationChose !== variation.id}">
          {{ variation.label }} : {{ formattedTime(getRoutineDuration()) }}
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useRoutineStore } from "@/store/routine";
import { routineTimeVariations } from "@/store/vars";
import { formattedTime } from '@/composables/formattedTime';

const { routineVariation, getRoutineDuration, setRoutineVariation } = useRoutineStore();
const variationChose = ref(0);

onMounted(() => {
  variationChose.value = routineVariation.id;
})

watch(variationChose, () => {
  setRoutineVariation(variationChose.value);
})

// TODO OPTION TO CLOSE MODAL INSTEAD OF CHOOSING
</script>

<style lang="scss">
@import "@/style/vars.scss";

.duration {
  visibility: visible;
  margin-bottom: $size-3;

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