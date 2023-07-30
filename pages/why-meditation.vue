<template>
  <section class="section">
    <div class="container">
      <h2>
        Why meditation?
      </h2>
      <p>
        Meditation is a powerful tool with a host of benefits for both your body and mind. Here are some of the key
        advantages:
      </p>
    </div>
    <div class="container container--wide">
      <div class="row row--wide center-xs">
        <div class="col-md-4">
          <img src="/assets/img/serenegrove-3.webp" alt="Regular meditation can lead to healthier lifestyle
            choices, thus improving life quality and longevity.">
        </div>
        <div class="col-md-8">
          <ul>
            <li><strong>Stress Reduction</strong>: Meditation lowers cortisol, the stress hormone, reducing stress levels.
            </li>
            <li><strong>Mental Health Improvement</strong>: Regular meditation can help manage anxiety and depression,
              fostering calmness, and peace.</li>
            <li><strong>Enhanced Concentration</strong>: Meditation trains the mind to focus better, increasing the
              attention
              span.</li>
            <li><strong>Emotional Health Boost</strong>: Through meditation, you can cultivate a positive outlook on life
              and
              improved self-image.</li>
          </ul>
        </div>

        <div class="col-md-8">
          <ul>
            <li><strong>Better Sleep</strong>: Regular meditation aids in better sleep quality by controlling runaway
              thoughts.</li>
            <li><strong>Immunity Boost</strong>: Meditation can fortify the immune system, making you more resistant to
              diseases.</li>
            <li><strong>Promotion of Mindfulness</strong>: Meditation enhances mindfulness, or being present in the
              moment,
              which can improve all aspects of life.</li>
            <li><strong>Healthier Lifestyle Encouragement</strong>: Regular meditation can lead to healthier lifestyle
              choices, thus improving life quality and longevity.</li>
          </ul>
        </div>
        <div class="col-md-4">
          <img src="/assets/img/serenegrove-4.webp"
            alt="Meditation lowers cortisol, the stress hormone, reducing stress levels.">
        </div>
      </div>
    </div>
    <div class="container">
      <div class="quote">
        <p><strong>In essence</strong>, meditation, though it requires patience and 
          practice, contributes significantly to overall well-being and health.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
definePageMeta({ layout: 'default' })  
</script>

<style lang="scss" scoped>
@import "@/style/vars.scss";

strong {
  font-size: 1.1em;
}

.row {
  font-size: 1.2em;

  &>div {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: $size-5;

    &:last-child {
      margin-bottom: $size-5;
    }
  }
}
</style>