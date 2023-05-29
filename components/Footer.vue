<template>
  <footer class="footer footer--custom">
    <div class="content columns">
      <div class="column">
        <h3>
          SereneGrove
        </h3>
        <p>
          A non-profit community to promote meditation and self consciousness.
        </p>
      </div>
      <div class="column footer__links">
        <ul>
          <li>
            <a href="#">About us</a>
          </li>
          <li>
            <a href="#">Contribute</a>
          </li>
          <li>
            <a href="#">Privacy</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="content footer__credits">
      SereneGrove - 2023 - All rights reserved
    </div>
  </footer>
</template>

<style lang="scss">
@import "@/style/vars.scss";
// more on bulma.scss

.footer {
  background-color: $dark-2;

  h3 {
    color: $clear;
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

    a {
      &:hover {
        color: $clear-1;
      }
    }
  }
}
</style>