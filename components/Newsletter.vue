<template>
  <div class="newsletter">
    <form
      action="https://danielerapisarda.us21.list-manage.com/subscribe/post?u=f668e4d9b5cfc362bf643a0f5&amp;id=a2510cc4f9&amp;f_id=00a355e1f0"
      method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank"
      novalidate>
      <div id="mc_embed_signup_scroll">
        <div class="mc-field-group field">
          <p>
            <label class="label" for="mce-EMAIL">Email Address<span class="asterisk">*</span></label>
            <input class="input required email" type="email" value="" name="EMAIL"  id="mce-EMAIL" required>
          </p>
        </div>
        <div id="mce-responses" class="clear foot">
          <div class="helper_text" id="mce-EMAIL-HELPERTEXT" ></div>
          <div for="mce-EMAIL" class="mce_inline_error"></div>
          <div class="response" id="mce-error-response" style="display:none"></div>
          <div class="response" id="mce-success-response" style="display:none"></div>
        </div>
        <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
        <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text"
            name="b_f668e4d9b5cfc362bf643a0f5_a2510cc4f9" tabindex="-1" value=""></div>
        <div class="optionalParent">
          <div class="clear foot">
            <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button is-primary">
            <p class="brandingLogo"><a href="http://eepurl.com/isevcA"
                title="Mailchimp - email marketing made easy and fun">Made with Mailchimp</a></p>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
useHead({
  script: [
    {
      src: '//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js',
      defer: true,
    },
    {
      src: '!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/f668e4d9b5cfc362bf643a0f5/70d223ff4652eb4352dae28cc.js");',
      id: 'mcjs'
    }
  ]
})
</script>

<style lang="scss">
.mc-field-group {
  flex-wrap: wrap;
  .input {
    flex: 1;
  }
}

#mce-responses {
  font-size: 0.8em;
  min-height: 2em;
}
</style>