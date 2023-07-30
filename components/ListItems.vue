<template>
  <div class="list-items">
    <p class="list-items__empty" v-if="routineSteps.length === 0">
      Add at least one exercise to your playlist
    </p>
    <ul v-else>
      <ListItem v-for="(step, index) in routineSteps" :key="index" :step="step" :index="index" :is-first="index === 0"
        :is-last="index === routineSteps.length - 1" />
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useRoutineStore, } from "@/store/routine";
import { ref, watch } from "vue";

const { steps, getRoutineSteps } =
  useRoutineStore();

const routineSteps = ref(getRoutineSteps());
watch(steps, (newSteps: number[]) => {
  routineSteps.value = getRoutineSteps()
})
</script>

<style lang="scss" scoped>
@import "@/style/vars.scss";

.list-items__empty {
  opacity: 0.5;
}
.card+.card {
  margin-top: $size-7;
}
</style>