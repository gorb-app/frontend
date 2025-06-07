export default (element: HTMLElement) => {
  if (element) {
    element.scrollTo({ top: element.scrollHeight });
    return;
  }
}
