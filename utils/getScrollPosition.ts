import type { ScrollPosition } from "~/types/interfaces";

export default (element: HTMLElement): ScrollPosition => {
  return {
    scrollHeight: element.scrollHeight,
    scrollWidth: element.scrollWidth,
    scrollTop: element.scrollTop,
    scrollLeft: element.scrollLeft,
    offsetHeight: element.offsetHeight,
    offsetWidth: element.offsetWidth,
    offsetTop: element.offsetTop,
    offsetLeft: element.offsetLeft
  };
}
