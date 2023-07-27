<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item navbar-item--logo" href="/">
        <Logo :horizontal="true" />
      </a>
    </div>

    <div class="navbar-menu">
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" tabindex="0" @click="toggleMenu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
      <Transition>
      <div class="navbar-start" :class="{ 'navbar-start--open': menuIsOpen }" v-show="menuIsOpen">
          <button class="button navbar-start__close" @click="toggleMenu">
            <CloseIcon />
          </button>
          <a href="/create">Start now!</a>
          <a href="/about">About us</a>
          <a href="/why-meditation">Why Meditation?</a>
          
          <div v-if="false" class="navbar-item has-dropdown is-hoverable">
            <hr class="navbar-divider">
          </div>
        </div>
      </Transition>
        
      <div v-if="false" class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light">
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import CloseIcon from "@/src/assets/img/icons/close.svg";
const menuIsOpen = ref(false);

const toggleMenu = () => {
  menuIsOpen.value = !menuIsOpen.value
};
</script>

<style lang="scss">
@import "@/style/vars.scss";

.navbar {
  background: url('/assets/img/forest_bg.webp') no-repeat top center $bg;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $size-7;

  .logo {
    height: 50px;
    width: 200px;
  }

  .navbar-burger {
    @media (min-width: $tablet) {
      display: none;
    }

    &:hover {
      cursor: pointer;
    }

    span {
      display: block;
      height: .3em;
      width: 2em;
      background: $white;
      margin-bottom: .4em;
      border-radius: 2px;
    }
  }

  .navbar-start {
    position: fixed;
    left: 0;
    top: 0;
    pointer-events: none;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    transition: opacity .3s ease-in-out 0s;
    background-color: $dark-5;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    @media (min-width: $tablet) {
      position: static;
      opacity: 1;
      flex-direction: row;
      background-color: transparent;
      display: block !important;
    }

    &.v-enter-from {
      opacity: 0;
    }

    &--open {
      opacity: 1;
      z-index: $playerZIndex - 3;
      pointer-events: all;
    }

    &.v-leave-to {
      opacity: 0;
      z-index: $playerZIndex - 3;
    }

    &__close {
      // TODO sync with player
      position: absolute;
      top: 0;
      right: 0;
      background-color: transparent;
      border: none;
      padding: $size-6 $size-7;

      @media (min-width: $tablet) {
        display: none;
      }

      svg {
        margin: 0;
      }

      svg path {
        fill: $white;
      }
    }

    a {
      position: relative;
      z-index: 1;
      margin-right: 2em;
      padding: $size-8 $size-7;

      &:after {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: $dark-5;
        z-index: -1;
        filter: blur(5px);
        opacity: .4;

        @media (min-width: $tablet) {
          content: "";
        }
      }

    }
  }
}
</style>