<template>
  <div class="list-items">
    <p v-if="routineSteps.length === 0" class="list-items__empty">
      Add at least one exercise to your playlist
    </p>
    <ul v-else>
      <ListItem
v-for="(step, index) in routineSteps" :key="index" :step="step" :index="index" :is-first="index === 0"
        :is-last="index === routineSteps.length - 1" @move-up="moveUp" @move-down="moveDown" @remove="remove"/>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useRoutineStore, } from "@/store/routine";
import { useGlobalStore} from "@/store/global";
import { ToastStyles } from "@/store/types";
import { ref, watch } from "vue";

const { steps, getRoutineSteps, moveStep, removeStep } =
  useRoutineStore();

const { setToastMessage } = useGlobalStore();

const moveUp = (e: number) => moveStep(e, -1)
const moveDown = (e: number) => moveStep(e, 1)
const remove = (e: {id: number, name: string}) => {
  removeStep(e.id)
  setToastMessage(`Step "${e.name}" removed from the routine`, ToastStyles.Warning);
};

const routineSteps = ref(getRoutineSteps());
watch(steps, () => {
  routineSteps.value = getRoutineSteps()
})
</script>

<style lang="scss" >
@import "@/style/vars.scss";

.list-items__empty {
  opacity: 0.5;
}
.card+.card {
  margin-top: $size-7;
}
</style>