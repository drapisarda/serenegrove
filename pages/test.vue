<template>
  <section class="section">
    <div class="container">
      <h1>
        Test your meditation companion
      </h1>
      <p>
        <strong>SereneGrove</strong> is on development. We would love to have you testing
        this early version.
      </p>
      <p>
        As it as a meditation companion. Play with it.
      </p>
    </div>
  </section>
  <ClientOnly v-if="rightfullTester">
    <section id="routine" class="section">
      <div class="container">
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
  </ClientOnly>
  <section class="section" v-else>
    <div class="container">
      <h2>
        We'd love to hear from you!
      </h2>
      <p>
        <strong>SereneGrove</strong> is on development, but you can subscribe to our newsletter 
        to stay updated on further development, access to early stage versions and 
        provide a feedback if you wish to do so.
      </p>
      <p>
        No spam. We promise.
      </p>
      <Newsletter />
    </div>
  </section>
  <section class="section" v-if="rightfullTester">
    <div class="container">
      <p>
        If you feel like to provide us a feedback, we would love to hear from you.
      </p>
      <p class="has-text-centered">
        <a class="button is-primary" :href="feedback_form" target="_blank">
          Give use your feedback
        </a>
      </p>
    </div>
  </section>
</template>

<script lang="ts" setup>
const { query } = useRoute();
const { test1,feedback_form } = useRuntimeConfig();
let rightfullTester = test1 === query.testid;
</script>
