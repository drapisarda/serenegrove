<template>
  <section class="hero hero--home">
    <div class="hero-body columns is-8 is-variable">
      <div class="column hero-bg"></div>
      <div class="column hero-claim">
        <div class="block">
          <h1 class="title is-spaced is-2">
            Your custom meditation routine.
          </h1>
          <h2 class="title is-4">
            Ready when you are. <br>
            Everywhere you are.
          </h2>
        </div>
        <p class="subtitle">
          Build a routine, enjoy presence.
        </p>
        <div class="block">
          <p>
            The service is still under development.
          </p>
          <p>
            <strong>Subscribe</strong> to be among the firsts to access the app, know about its development 
            and contribute to the project.
          </p>
          <p>
            Let's make meditation easyer and accessible for everyone. Together.
          </p>
        </div>
        <div class="block">
          <p>
            <input class="input block" type="email" placeholder="subscribe to our newsletter">
            <button class="button success">Subscribe</button>
          </p>
        </div>
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