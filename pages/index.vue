<template>
  <section class="hero hero--home">
    <div class="hero-body">
      <div class="columns is-6 is-variable">
        <div class="column hero__bg">
          <Logo />
        </div>
        <div class="column hero__claim">
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
          <div class="hero__button block">
            <a href="#routine" class="button is-success">
              Create your routine now
            </a>
          </div>
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

<style lang="scss">
@import "@/style/vars.scss";

.hero {
  min-height: 100svh;

  .title {
    color: $clear;
  }

  &__bg {
    background: url('/assets/img/forest_bg.webp') no-repeat top center $bg;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .subtitle {
    color: $clear-1;
  }

  .logo {
    height: 25vh;

    @media (min-width: $tablet) {
      height: 300px;

    }
  }
}
</style>