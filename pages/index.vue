<template>
  <section class="hero hero--home">
    <div class="hero-body columns is-8 is-variable">
      <div class="column hero-bg"></div>
      <div class="column hero-claim">
        <p class="title block is-spaced">
          Your custom meditation routine. <br>
          Ready when you are. <br>
          Everywhere you are.
        </p>
        <p class="subtitle block">
          Build a routine, enjoy presence.
        </p>
        <div class="hero-button block">
          <a href="#routine" class="button is-success">
            Create your routine now
          </a>
        </div>
      </div>
    </div>
  </section>
  <section id="routine">
    <Player />
    <List />
  </section>
  <Toast />
</template>  

<style lang="scss" scoped>
@import "@/style/vars.scss";

.hero {
  min-height: 100svh;

  .title {
    color: $clear;
    font-size: clamp(100%, 1rem + 2vw, $size-1);
  }

  .hero-bg {
    background: url('/assets/img/forest_bg.webp') no-repeat top center $bg;
    background-size: cover;
  }

  .subtitle {
    color: $clear-1;
  }
}
</style>