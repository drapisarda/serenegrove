<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a
        class="navbar-item navbar-item--logo"
        href="/"
        aria-label="SereneGrove"
      >
        <Logo :horizontal="true" />
      </a>
    </div>

    <div class="navbar-menu">
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        tabindex="0"
        @keyup="toggleMenu"
        @click="toggleMenu"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
      <Transition>
        <div
          v-show="menuIsOpen"
          class="navbar-start"
          :class="{ 'navbar-start--open': menuIsOpen }"
          aria-expanded="true"
        >
          <button class="button button--close" @click="toggleMenu">
            <CloseIcon />
          </button>
          <NuxtLink class="button navbar-cta" href="/create"
            >Start now!</NuxtLink
          >
          <NuxtLink href="/about">About us</NuxtLink>
          <NuxtLink href="/why-meditation">Why Meditation?</NuxtLink>

          <div v-if="false" class="navbar-item has-dropdown is-hoverable">
            <hr class="navbar-divider" />
          </div>
        </div>
      </Transition>

      <div v-if="false" class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light"> Log in </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import CloseIcon from '@/src/assets/img/icons/close.svg'
const menuIsOpen = ref(false)

const toggleMenu = () => {
  menuIsOpen.value = !menuIsOpen.value
}
</script>

<style lang="scss">
@import '@/style/vars.scss';

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
      height: 0.3em;
      width: 2em;
      background: $white;
      margin-bottom: 0.4em;
      border-radius: 2px;
    }
  }

  .navbar-cta {
    background-color: $clear-2;
    border-color: $dark-3;
    color: $dark-3;
    border-radius: 0;

    &:hover {
      background-color: $dark-3;
      border-color: $dark-3;
      color: $clear-4;
    }

    &::after {
      display: none;
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
    transition: opacity 0.3s ease-in-out 0s;
    background-color: $dark-5;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    @media (min-width: $tablet) {
      position: static;
      flex-direction: row;
      background-color: transparent;
      pointer-events: all;
      display: block !important;
    }

    &.v-enter-from {
      opacity: 0;
    }

    &.v-enter-to,
    &--open {
      opacity: 1;
      z-index: $playerZIndex - 3;
      pointer-events: all;
    }

    &.v-leave-from {
      opacity: 1;
      z-index: $playerZIndex - 3;
    }

    &.v-leave-to {
      opacity: 0;
      z-index: $playerZIndex - 3;
    }

    .button--close {
      @media (min-width: $tablet) {
        display: none;
      }
    }

    a {
      position: relative;
      z-index: 1;
      margin-right: 2em;
      padding: $size-8 $size-7;
      font-weight: 700;

      &:after {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: $dark-5;
        z-index: -1;
        filter: blur(5px);
        opacity: 0.4;

        @media (min-width: $tablet) {
          content: '';
        }
      }
    }
  }
}
</style>
