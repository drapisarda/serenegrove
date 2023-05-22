<template>
  <section class="hero hero--home">
    <div class="hero-body">
      <p class="title">
        Welcome to CalmRoots
      </p>
      <p class="subtitle">
        Create your custom meditation routine. Ready when you are. Everywhere you are.
      </p>
      <div class="hero-button">
        <a href="#routine" class="button is-success">
          Create your routine now
        </a>
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
  background: url('/assets/img/forest_bg.webp') no-repeat top center $bg;
  background-size: cover;
  min-height: 100svh;
  .title {
    color: $clear;
  }
  
  .subtitle {
    color: $clear;
  }
}
</style>