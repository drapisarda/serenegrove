<template>
  <div class="feedback-request">
    <h3>
      How you liked this meditation?
    </h3>
    <p>
      We'd love to here from you. Please, share your opinion with use. Fill this 3 minutes form and help
      us to grow and make your meditations better and better.
    </p>
    <p class="has-text-centered">
      <a class="button is-primary" :href="feedback_form" target="_blank">
        Give use your feedback
      </a>
    </p>
  </div>
</template>

<script lang="ts" setup>
  const { feedback_form } = useRuntimeConfig();
</script>