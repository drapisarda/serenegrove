<template>
  <footer class="footer footer--custom">
    <div class="container is-max-widescreen">
      <div class="columns">

        <div class="column is-8">
          <h3>
            SereneGrove
          </h3>
          <p>
            A non-profit community to promote meditation and self consciousness.
          </p>
        </div>
        <div class="column is-4 footer__links">
          <ul>
            <li>
              <a href="/about">About us</a>
            </li>
            <li>
              <a href="#">Privacy</a>
            </li>
            <li>
              <a href="/credits">Credits</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="content footer__credits">
      SereneGrove - 2023 - All rights reserved
    </div>
  </footer>
</template>

<style lang="scss" scoped>
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
  }
}
</style>