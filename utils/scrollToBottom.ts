export default (element: Ref<HTMLElement | undefined, HTMLElement | undefined>) => {
  if (element.value) {
    element.value.scrollTo({ top: element.value.scrollHeight });
    return;
  }
}
