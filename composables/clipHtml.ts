export function clipHtml(watchable: any) {
  watch(watchable, (newValue) => {
    if (newValue) {
      document.documentElement.classList.add('is-clipped');
    } else {
      document.documentElement.classList.remove('is-clipped');
    }
  })
}