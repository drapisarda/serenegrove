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
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/create">Start now!</a>
              </li>
              <li>
                <a href="/about">About us</a>
              </li>
              <li>
                <a href="/why-meditation">Why Meditation?</a>
              </li>
              <li>
                <a href="/privacy">Privacy & Datenschutzerklärung</a>
              </li>
              <li>
                <a href="/newsletter">Newsletter</a>
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

    li {
      line-height: 1.3em;
    }
  }

  &__about {
    margin-bottom: $size-5;
  }
}
</style>