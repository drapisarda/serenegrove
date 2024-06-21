<template>
  <slot>
    <div class="hero hero--home">
      <div class="row is-variable">
        <div class="col-md-6 hero__bg">
          <Logo />
        </div>
        <section class="col-md-6 hero__claim section">
          <h1 class="is-spaced">Your custom guided meditation routine.</h1>
          <h3>
            Ready when you are. <br />
            Everywhere you are.
          </h3>
        </section>
      </div>
    </div>
  </slot>
</template>

<script lang="ts" setup></script>

<style lang="scss">
@import '@/style/vars.scss';

.hero {
  min-height: 80vh;
  display: flex;
  align-items: stretch;
  background-color: $dark-5;

  @media (min-width: $tablet) {
    padding: 0 $size-4 0 0;
    min-height: 90svh;
  }

  .subtitle {
    color: $clear-2;
  }

  .title {
    color: $clear-1;
  }

  ul {
    list-style: disc;
    padding-left: 1em;
  }

  &__bg {
    background: url('/assets/img/forest_bg.webp') no-repeat top center $bg;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }

  &__claim {
    justify-content: center;
    display: flex;
    flex-direction: column;

    @media (min-width: $tablet) {
      padding: 0 $size-5;
    }
  }

  .logo {
    height: 25vh;

    @media (min-width: $tablet) {
      height: 55vh;
    }
  }
}
</style>
