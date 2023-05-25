<template>
  <div class="waveContainer">
    <div class="wave wave1"></div>
    <div class="wave wave2"></div>
    <div class="wave wave3"></div>
    <div class="wave wave4"></div>
    <div class="wave wave5"></div>
  </div>
</template>


<style lang="scss">
@import "@/style/vars.scss";

.waveContainer {
  display: flex;
  margin: auto;
  justify-content: space-between;
  --boxSize: 8px;
  --gutter: #{$size-5};
  width: calc((var(--boxSize) + var(--gutter)) * 5);
  height: 100%;
}

.wave {
  transform: scaleY(.4);
  height: 100%;
  width: var(--boxSize);
  background: #12E2DC;
  animation-duration: 1.2s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  border-radius: 8px;
}

.wave1 {
  animation-name: quiet;
}

.wave2 {
  animation-name: normal;
}

.wave3 {
  animation-name: quiet;
}

.wave4 {
  animation-name: loud;
}

.wave5 {
  animation-name: quiet;
}

@keyframes quiet {
  25% {
    transform: scaleY(.6);
  }

  50% {
    transform: scaleY(.4);
  }

  75% {
    transform: scaleY(.8);
  }
}

@keyframes normal {
  25% {
    transform: scaleY(1);
  }

  50% {
    transform: scaleY(.4);
  }

  75% {
    transform: scaleY(.6);
  }
}

@keyframes loud {
  25% {
    transform: scaleY(1);
  }

  50% {
    transform: scaleY(.4);
  }

  75% {
    transform: scaleY(1.2);
  }
}

@keyframes off {
  90% {
    transform: scaleY(0.1);
  }
}

</style>