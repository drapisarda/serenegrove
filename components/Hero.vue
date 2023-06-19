<template>
  <slot>
    <div class="hero hero--home">
      <div class="hero-body">
        <div class="row is-variable">
          <div class="col-sm hero__bg">
            <Logo />
          </div>
          <section class="col-sm hero__claim section">
            <h1 class="is-spaced">
              Your custom guided meditation routine.
            </h1>
            <h3>
              Ready when you are. <br>
              Everywhere you are.
            </h3>
            <p>
              <strong>SereneGrove</strong> allows you to create your very own guided meditation routine. With your
              favorite
              exercises, in the
              order you like the most, to have where and when you prefer.
            </p>
            <p>
              A regular meditation can help you achieving
            </p>
            <ul>
              <li>Stress relief</li>
              <li>Mental strength</li>
              <li>Resilience in everyday life</li>
              <li>Calm</li>
              <li>Better sleep quality</li>
            </ul>
            <p class="has-text-centered">
              <a class="button is-primary" href="#routine"> Start Now </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  </slot>
</template>

<script lang="ts">
</script>

<style lang="scss">
@import "@/style/vars.scss";

.hero {
  min-height: 80svh;
  
  .subtitle {
    color: $clear-2;
  }
  
  &-body {
    background-color: $dark-5;
    @media (min-width: $tablet) {
      padding: $size-4;
    }
  }

  @media (min-width: $tablet) {
    min-height: 25svh;
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
    @media (min-width: $tablet) {
      padding: 0 $size-5;
    }
  }

  .logo {
    height: 25vh;

    @media (min-width: $tablet) {
      height: 300px;

    }
  }
}
</style>