<template>
  <div class="start-wide">
    <div class="section--clear row">
      <ClientOnly>
        <template #fallback>
          <Loader />
        </template>

        <div class="col col-md-7">
          <div class="start-wide__title">
            <h2>
              Pick your exercises
            </h2>
          </div>
          <div class="start-wide__content">
            <ListStepItems />
          </div>
        </div>

        <div class="col">
          <div class="start-wide__title">
            <h2>
              Your meditation routine
            </h2>
          </div>
          <div class="start-wide__content">
            <ListItems />
          </div>
        </div>
      </ClientOnly>
    </div>
    <PlayerBar class="start-wide__player-bar" v-show="!emptyRoutine"/>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ layout: 'player' })
import { useRoutineStore } from "@/store/routine";
const { steps } = useRoutineStore();

const emptyRoutine = computed((): Boolean => {
  return steps.length === 0;
})
</script>


<style lang="scss" scoped>
@import "@/style/vars.scss";

.start-wide {
  display: flex;
  flex-direction: column;
  color: $black;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  ul {
    list-style: none;
  }

  .row {
    overflow: scroll;
    
    @media (min-width: $tablet) {
      height: 100%;
    }
  }
  
  .col {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &__content {
    overflow: scroll;
    flex: 1;
  }

  .steps-list {
    padding-bottom: $barHeight;
    overflow: scroll;
  }

  &__player-bar {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    height: $barHeight;
  }
}
</style>