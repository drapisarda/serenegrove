<template>
  <Hero />
  <section class="section">
    <div class="container">
      <h3>
        How you want to meditate. When you want to meditate. For free.
      </h3>
      <p class="subtitle">
        It's all about <strong>practice</strong>.
      </p>
      <p>
        Meditation should be <strong>free and available</strong> for everybody. Either you are and experienced or
        beginner
        practitioner of meditation, we have something for you.
      </p>
      <p>
        We created this website to give to the community a tool <strong>without all the fuss and effective in its
          use</strong>, that you can use <strong> now and for free</strong>.
        Just setup your favorite routine, sit comfortable, and start your meditation routine.
      </p>
    </div>
  </section>

  <section id="routine" class="section section--clear is-centered">
    <div class="container">
      <h2>
        Create your routine. Enjoy meditation.
      </h2>
      <a href="/start" class="button is-primary is-large">
        Start now!
      </a>
    </div>
  </section>

  <section class="section">
    <div class="container">
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
</template>

<script setup>
definePageMeta({ layout: 'home' })  
</script>