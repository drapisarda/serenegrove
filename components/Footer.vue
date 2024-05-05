<template>
  <footer class="footer footer--custom">
    <div class="section">
      <div class="container">
        <div class="row">
          <div class="col-md-8 footer__about">
            <h3>
              SereneGrove
            </h3>
            <p>
              A non-profit community to promote meditation and self consciousness.
            </p>
          </div>
          <div class="col-md-4 footer__links">
            <ul>
              <li>
                <NuxtLink href="/">Home</NuxtLink>
              </li>
              <li>
                <NuxtLink href="/create">Start now!</NuxtLink>
              </li>
              <li>
                <NuxtLink href="/about">About us</NuxtLink>
              </li>
              <li>
                <NuxtLink href="/why-meditation">Why Meditation?</NuxtLink>
              </li>
              <li>
                <NuxtLink href="/privacy">Privacy & Datenschutzerklärung</NuxtLink>
              </li>
              <li>
                <NuxtLink href="/newsletter">Newsletter</NuxtLink>
              </li>
              <li>
                <NuxtLink href="/credits">Credits</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="content footer__credits">
        SereneGrove - 2023 - All rights reserved
      </div>
    </div>
  </footer>
</template>

<style lang="scss" >
@import "@/style/vars.scss";

.footer {
  background-color: $dark-5;

  .content ul {
    list-style: none;
  }

  h3 {
    color: $clear-1;
  }

  &__credits {
    text-align: center;
    margin-top: $size-2;
  }

  &__links {
    ul {
      list-style: none;
      display: flex;
      flex-direction: column;
    }

    li {
      line-height: 1.3em;
    }
  }

  &__about {
    margin-bottom: $size-5;
  }
}
</style>