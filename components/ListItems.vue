<template>
  <div class="list-items">
    <p v-if="routineSteps.length === 0" class="list-items__empty">
      Add at least one exercise to your playlist
    </p>
    <ul v-else>
      <ListItem
        v-for="(step, index) in routineSteps"
        :key="index"
        :step="step"
        :index="index"
        :is-first="index === 0"
        :is-last="index === routineSteps.length - 1"
        @move-up="moveUp(index)"
        @move-down="moveDown(index)"
        @remove="remove"
      />
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useRoutineStore } from '@/store/routine'
import { useGlobalStore } from '@/store/global'
import { ToastStyles } from '@/store/types'
import { computed } from 'vue'
import ListItem from '@/components/ListItem.vue'

const { getRoutineSteps, moveStep, removeStep } = useRoutineStore()

const { setToastMessage } = useGlobalStore()

const moveUp = (index: number) => moveStep(index, -1)
const moveDown = (index: number) => moveStep(index, 1)
const remove = (e: { index: number; name: string }) => {
  removeStep(e.index)
  setToastMessage(
    `Step "${e.name}" removed from the routine`,
    ToastStyles.Warning,
  )
}

const routineSteps = computed(() => getRoutineSteps())
</script>

<style lang="scss">
@import '@/style/vars.scss';

.list-items__empty {
  opacity: 0.5;
}
.card + .card {
  margin-top: $size-7;
}
</style>
