<template>
  <section class="hero hero--home">
    <div class="hero-body">
      <div class="columns is-6 is-variable">
        <div class="column hero__bg">
          <Logo />
        </div>
        <div class="column hero__claim">
          <h1 class="is-spaced is-2">
            Your custom guided meditation routine.
          </h1>
          <h3 class="is-4">
            Ready when you are. <br>
            Everywhere you are.
          </h3>
          <p>
            <strong>SereneGrove</strong> allows you to create your very own routine. With your favourite exercises, in the
            order you like the most, to have where and when you prefere.
          </p>
          <p>
            A regular meditation can help you achieving
          </p>
          <ul>
            <li>Stress relief</li>
            <li>Mental strenght</li>
            <li>Resilience in everyday life</li>
            <li>Calm</li>
            <li>Better sleep quality</li>
          </ul>
          <p class="has-text-centered">
            <a class="button is-primary" href="#routine"> Start Now </a>
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container is-max-widescreen">
      <h3>
        How you want to meditate. When you want to meditate. For free.
      </h3>
      <p class="subtitle">
        Premium meditation tools can be good and full of usefull features. But the core of meditation is very small.
        It's all about <strong>practice</strong>.
      </p>
      <p>
        Meditation should be <strong>free and available</strong> for everybody. Either you are and experienced or beginner
        practicioner of meditation, we have something for you.
      </p>
      <p>
        We created this website to give to the community a tool <strong>without all the fuss and effective in its
          use</strong>, that you can use <strong> now and for free</strong>.
        Just setup your favourite routine, sit confortable, and start your meditation routine.
      </p>
    </div>
  </section>

  <section id="routine" class="section section--clear">
    <div class="container is-max-widescreen">
      <h2>
        Create your routine. Enjoy meditation.
      </h2>
      <p>
        Start by just clicking on the "Add steps to your routine" button.
      </p>
      <p></p>
      <Player />
      <List />
    </div>
  </section>

  <section class="section">
    <div class="container is-max-widescreen">
      <div class="block">
        <h2>
          Stay in touch!
        </h2>
        <p>
          <strong>Subscribe</strong> to be among the first to know about its development
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
  <Toast />
</template>

<style lang="scss">
@import "@/style/vars.scss";

.hero {
  min-height: 80svh;

  .subtitle {
    color: $clear-2;
  }

  &-body {
    background-color: $dark-5;
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
  }

  .logo {
    height: 25vh;

    @media (min-width: $tablet) {
      height: 300px;

    }
  }
}
</style>