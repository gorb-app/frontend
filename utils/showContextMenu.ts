import { render } from "vue";
import ContextMenu from "~/components/UserInterface/ContextMenu.vue";
import type { ContextMenuInterface, ContextMenuItem, ContextMenuSection } from "~/types/interfaces";

export default (e: MouseEvent | PointerEvent, contextMenu: ContextMenuInterface, sections: ContextMenuSection[]) => {
  e.preventDefault();
  e.stopPropagation();
  console.log("Menu sections:", sections);
  if (sections.length) {
    console.log("Showing context menu");
    contextMenu.show = true;
    contextMenu.pointerX = e.clientX;
	contextMenu.pointerY = e.clientY;
    contextMenu.sections = sections;
    console.log("Showed");
  }
}
