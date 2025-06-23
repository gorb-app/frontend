import type { ScrollPosition } from "~/types/interfaces";

export default (element: HTMLElement, scrollPosition: ScrollPosition) => {
  return element.scrollTo({ top: scrollPosition.scrollTop, left: scrollPosition.scrollLeft });
}
