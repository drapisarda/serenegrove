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
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container is-max-widescreen">
      <div class="block">
        <h2>
          Get early access!
        </h2>
        <p>
          The service will be publicly available on July 2023. But you can <strong>get early access now</strong>.
        </p>
        <p>
          <strong>Subscribe</strong> to be among the first to access the app, know about its development
          and contribute to the project. We'll use your email exclusively to contact you about SereneGrove.
        </p>
        <p>
          <strong>
            No spam. No unrelated content. Never.
          </strong>
        </p>
        <p>
          Let's make meditation easier and accessible for everyone. <strong>Together</strong>.
        </p>
      </div>
      <Newsletter />
    </div>
  </section>
  <section v-if="false" class="section is-centered">
    <a href="#routine" class="button is-primary is-large">
      Create your routine now
    </a>
  </section>
  <section id="routine" class="section">
    <Player />
    <List />
  </section>
  <Toast />
</template>

<style lang="scss">
@import "@/style/vars.scss";

.hero {
  min-height: 80svh;

  &-body {
    background-color: $dark-5;
  }

  @media (min-width: $tablet) {
    min-height: 25svh;
  }

  .title {
    color: $clear-1;
  }

  &__bg {
    background: url('/assets/img/forest_bg.webp') no-repeat top center $bg;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo {
    height: 25vh;

    @media (min-width: $tablet) {
      height: 300px;

    }
  }
}
</style>