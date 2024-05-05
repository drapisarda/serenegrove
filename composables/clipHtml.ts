export function clipHtml(watchable: Ref<boolean>) {
  if (typeof watch === 'undefined') return;
  watch(watchable, (newValue) => {
    if (newValue) {
      document.documentElement.classList.add('is-clipped');
    } else {
      document.documentElement.classList.remove('is-clipped');
    }
  })
}